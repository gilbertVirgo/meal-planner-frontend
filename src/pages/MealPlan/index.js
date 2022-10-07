import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

import Button from "react-bootstrap/Button";
import { ButtonGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Form from "react-bootstrap/Form";
import Header from "../../components/Header";
import { Info } from "luxon";
import InputGroup from "react-bootstrap/InputGroup";
import React from "react";
import RecipeBrowserModal from "../../components/RecipeBrowserModal";
import Spinner from "react-bootstrap/Spinner";
import Table from "react-bootstrap/Table";
import get from "../../api/get";
import patch from "../../api/patch";

export default () => {
	const [plan, setPlan] = React.useState();
	const [recipes, setRecipes] = React.useState();
	const [showRecipeBrowserModal, setShowRecipeBrowserModal] =
		React.useState(false);
	const [editingDayIndex, setEditingDayIndex] = React.useState();

	const loadData = () => {
		get("plan").then((plan) => {
			setPlan(plan);
			get("plan/recipes").then(setRecipes);
		});
	};

	React.useEffect(() => {
		loadData();
	}, []);

	// Open the modal, set the index
	const beginAddingRecipe = (dayIndex) => {
		setShowRecipeBrowserModal(true);
		setEditingDayIndex(dayIndex);
	};

	const finishAddingRecipe = (recipeId) => {
		const temp = { ...plan };
		temp.recipes[editingDayIndex] = recipeId;
		setPlan(temp);

		patch("plan", temp).then(loadData);
	};

	const handleRemoveRecipe = (dayIndex) => {
		setEditingDayIndex(dayIndex);

		const temp = { ...plan };
		temp.recipes[dayIndex] = null;
		setPlan(temp);

		patch("plan", temp).then(loadData);
	};

	const handleReset = () => {
		const temp = { ...plan };
		temp.recipes = Array(7).fill(null);
		setPlan(temp);

		patch("plan", temp).then(loadData);
	};

	React.useEffect(() => {
		setEditingDayIndex(undefined);
		setShowRecipeBrowserModal(false);
	}, [plan, recipes]);

	return (
		<React.Fragment>
			<Header>Meal Plan</Header>
			{plan && recipes ? (
				<Table striped bordered>
					<thead>
						<tr>
							{["Day", "Recipe"].map((title, index) => (
								<td
									key={`td-${index}`}
									style={{ width: "50%" }}
								>
									<strong>{title}</strong>
								</td>
							))}
						</tr>
					</thead>
					<tbody>
						{plan.recipes.map((id, dayIndex) => {
							const recipe = recipes.find((r) => r.id === id);

							return (
								<tr key={`tr-${dayIndex}`}>
									<td>{Info.weekdays("long")[dayIndex]}</td>
									<td
										style={{
											justifyContent: "space-between",
											display: "flex",
										}}
									>
										{recipe && recipe.title ? (
											<React.Fragment>
												{recipe.title}
												<Button
													size="sm"
													variant="danger"
													onClick={() =>
														handleRemoveRecipe(
															dayIndex
														)
													}
												>
													{editingDayIndex ===
													dayIndex ? (
														<Spinner
															as="span"
															size="sm"
															animation="border"
														/>
													) : (
														<FontAwesomeIcon
															icon={faTrash}
														/>
													)}
												</Button>
											</React.Fragment>
										) : (
											<InputGroup>
												<Button
													size="sm"
													variant="secondary"
													onClick={() =>
														beginAddingRecipe(
															dayIndex
														)
													}
												>
													{editingDayIndex ===
													dayIndex ? (
														<Spinner
															as="span"
															size="sm"
															animation="border"
														/>
													) : (
														<FontAwesomeIcon
															icon={faPlus}
														/>
													)}
												</Button>
											</InputGroup>
										)}
									</td>
								</tr>
							);
						})}
					</tbody>
				</Table>
			) : (
				<Spinner animation="border" />
			)}

			<hr />
			<div style={{ display: "flex", columnGap: "15px" }}>
				{[
					{
						children: "Reset",
						onClick: handleReset,
						variant: "danger",
					},
					{ children: "Review checklist", href: "/checklist" },
				].map((props) => (
					<Button {...props} />
				))}
			</div>

			<RecipeBrowserModal
				show={showRecipeBrowserModal}
				onHide={() => setShowRecipeBrowserModal(false)}
				onSubmit={finishAddingRecipe}
			/>
		</React.Fragment>
	);
};
