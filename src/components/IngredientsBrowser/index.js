import Button from "react-bootstrap/Button";
import DataList from "../DataList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Form from "react-bootstrap/Form";
import NewIngredientModal from "./NewIngredientModal";
import React from "react";
import Section from "../Section";
import Spinner from "react-bootstrap/Spinner";
import Table from "react-bootstrap/Table";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import get from "../../api/get";
import units from "./units";

export default ({ chosenIngredients, onChange }) => {
	const [ingredients, setIngredients] = React.useState();
	const [loadRequired, setLoadRequired] = React.useState(true);
	const [showNewIngredientModal, setShowNewIngredientModal] =
		React.useState(false);
	const [newIngredientModalDefaultValue, setNewIngredientModalDefaultValue] =
		React.useState("");

	React.useEffect(() => {
		if (loadRequired) {
			get("ingredients").then(setIngredients);

			setLoadRequired(false);
		}
	}, [loadRequired]);

	const handleIngredientSelected = ({ id, title, lastUsedUnit }) => {
		onChange([
			{ id, title, amount: "1", unit: lastUsedUnit },
			...chosenIngredients,
		]);
	};

	const handleChangeChosenIngredient = ({ id, ...changedProps }) =>
		onChange(
			chosenIngredients.map((chosenIngredient) => {
				if (chosenIngredient.id !== id) return chosenIngredient; // ignore

				let patch = { ...chosenIngredient };

				Object.keys(changedProps).forEach((key) => {
					patch[key] = changedProps[key];
				});

				return patch;
			})
		);

	const handleCreateNewItem = (filter) => {
		setNewIngredientModalDefaultValue(filter);
		setShowNewIngredientModal(true);
	};

	const handleRemoveIngredient = (idToRemove) => {
		onChange(
			chosenIngredients.filter(
				(ingredient) => ingredient.id !== idToRemove
			)
		);
	};

	return ingredients ? (
		<React.Fragment>
			<Section>
				<DataList
					items={ingredients}
					filteredProperty="title"
					onItemSelected={handleIngredientSelected}
					onCreateNewItem={handleCreateNewItem}
				/>
			</Section>

			<Section>
				{chosenIngredients.length ? (
					<Table bordered striped>
						<thead>
							<tr>
								{["Ingredient", "Amount", "Unit", ""].map(
									(title, index) => (
										<td key={`table-title-${index}`}>
											<strong>{title}</strong>
										</td>
									)
								)}
							</tr>
						</thead>
						<tbody>
							{chosenIngredients.map(
								(
									{ id, title, unit: selectedUnit, amount },
									index
								) => {
									return (
										<tr key={`table-row-${index}`}>
											<td>{title}</td>
											<td style={{ width: "150px" }}>
												<Form.Control
													type="number"
													value={amount}
													onChange={({
														target: { value },
													}) =>
														handleChangeChosenIngredient(
															{
																id,
																amount: value,
															}
														)
													}
												/>
											</td>
											<td style={{ width: "150px" }}>
												<Form.Select
													value={selectedUnit}
													onChange={({ target }) =>
														handleChangeChosenIngredient(
															{
																id,
																unit: target
																	.options[
																	target
																		.selectedIndex
																].value,
															}
														)
													}
												>
													{units.map(
														(unit, index) => (
															<option
																key={`option-${index}`}
																value={unit}
															>
																{unit}
															</option>
														)
													)}
												</Form.Select>
											</td>
											<td style={{ width: "0" }}>
												<Button
													variant="danger"
													onClick={() =>
														handleRemoveIngredient(
															id
														)
													}
												>
													<FontAwesomeIcon
														icon={faTrash}
													/>
												</Button>
											</td>
										</tr>
									);
								}
							)}
						</tbody>
					</Table>
				) : (
					<Form.Text muted>Please choose some ingredients</Form.Text>
				)}
			</Section>

			<NewIngredientModal
				defaultValue={newIngredientModalDefaultValue}
				show={showNewIngredientModal}
				onHide={() => setShowNewIngredientModal(false)}
				onNewIngredient={() => setLoadRequired(true)}
			/>
		</React.Fragment>
	) : (
		<Spinner animation="border" role="status" />
	);
};
