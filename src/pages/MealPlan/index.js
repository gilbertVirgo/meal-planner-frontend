import { Button, ListGroup, MiniButtonGroup } from "react-bootstrap";
import { faClose, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Form from "react-bootstrap/Form";
import Header from "../../components/Header";
import { Info } from "luxon";
import InputGroup from "react-bootstrap/InputGroup";
import MiniButton from "../../components/MiniButton";
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
			get("plan/recipes").then((recipes) => {
				setPlan(plan);
				setRecipes(recipes);
			});
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
		temp.recipes[editingDayIndex].push(recipeId);

		patch("plan", temp).then(loadData);
	};

	const handleRemoveRecipe = ({ dayIndex, id }) => {
		const temp = { ...plan };

		console.log({ recipeIds: temp.recipes[dayIndex], id });

		temp.recipes[dayIndex] = temp.recipes[dayIndex].filter(
			(rId) => rId !== id
		);

		patch("plan", temp).then(loadData);
	};

	const handleReset = () => {
		const temp = { ...plan };
		temp.recipes = Array(7).fill([]);

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
									style={
										index === 0
											? { width: "fit-content" }
											: {}
									}
								>
									<strong>{title}</strong>
								</td>
							))}
						</tr>
					</thead>
					<tbody>
						{plan.recipes.map((recipeIds, dayIndex) => {
							return (
								<tr key={`tr-${dayIndex}`}>
									<td>{Info.weekdays("long")[dayIndex]}</td>
									<td
										style={{
											justifyContent: "space-between",
											display: "flex",
											padding: 0,
											position: "relative",
										}}
									>
										<ListGroup
											variant="flush"
											style={{ width: "100%" }}
										>
											{recipeIds.length
												? recipeIds.map((id) => {
														const recipe =
															recipes.find(
																(r) =>
																	r.id === id
															);

														return (
															<ListGroup.Item
																style={{
																	backgroundColor:
																		"transparent",
																	display:
																		"flex",
																	justifyContent:
																		"space-between",
																}}
															>
																{recipe.title}{" "}
																<MiniButton
																	variant="danger"
																	size="sm"
																	onClick={() =>
																		handleRemoveRecipe(
																			{
																				dayIndex,
																				id,
																			}
																		)
																	}
																>
																	<FontAwesomeIcon
																		icon={
																			faClose
																		}
																	/>
																</MiniButton>
															</ListGroup.Item>
														);
												  })
												: ""}
											<ListGroup.Item
												style={{
													backgroundColor:
														"transparent",
													textAlign: "center",
												}}
											>
												<MiniButton
													variant="secondary"
													size="sm"
													onClick={() =>
														beginAddingRecipe(
															dayIndex
														)
													}
												>
													<FontAwesomeIcon
														icon={faPlus}
													/>
												</MiniButton>
											</ListGroup.Item>
										</ListGroup>
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
				].map((props, index) => (
					<Button key={`button-${index}`} {...props} />
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

// recipe && recipe.title ? (
// 	<React.Fragment>
// 		{recipe.title}
// 		<MiniButton
// 			size="sm"
// 			variant="danger"
// 			onClick={() =>
// 				handleRemoveRecipe(
// 					dayIndex
// 				)
// 			}
// 		>
// 			{editingDayIndex ===
// 			dayIndex ? (
// 				<Spinner
// 					as="span"
// 					size="sm"
// 					animation="border"
// 				/>
// 			) : (
// 				<FontAwesomeIcon
// 					icon={faTrash}
// 				/>
// 			)}
// 		</MiniButton>
// 	</React.Fragment>
// ) : (
// 	<InputGroup>
// 		<MiniButton
// 			size="sm"
// 			variant="secondary"
// 			onClick={() =>
// 				beginAddingRecipe(
// 					dayIndex
// 				)
// 			}
// 		>
// 			{editingDayIndex ===
// 			dayIndex ? (
// 				<Spinner
// 					as="span"
// 					size="sm"
// 					animation="border"
// 				/>
// 			) : (
// 				<FontAwesomeIcon
// 					icon={faPlus}
// 				/>
// 			)}
// 		</MiniButton>
// 	</InputGroup>
