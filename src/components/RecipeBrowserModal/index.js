import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import React from "react";
import Section from "../Section";
import Spinner from "react-bootstrap/Spinner";
import get from "../../api/get";

export default ({ onHide, show, onSubmit }) => {
	const [recipes, setRecipes] = React.useState();
	const [selectedRecipe, setSelectedRecipe] = React.useState("");

	React.useEffect(() => {
		get("recipes").then(setRecipes);
	}, []);

	const handleSubmit = () => {
		onSubmit(selectedRecipe);
	};

	return (
		<Modal show={show} onHide={onHide}>
			<Modal.Body>
				{recipes ? (
					<React.Fragment>
						<Section>
							<Form.Label>Please select a recipe</Form.Label>
							<Form.Select
								value={selectedRecipe}
								onChange={({ target }) =>
									setSelectedRecipe(
										target.options[target.selectedIndex]
											.value
									)
								}
							>
								<option value="">Choose a recipe</option>
								{recipes
									.sort((a, b) =>
										a.title
											.toLowerCase()
											.localeCompare(
												b.title.toLowerCase()
											)
									)
									.map(({ id, title }, index) => (
										<option
											key={`option-3-${index}`}
											value={id}
										>
											{title}
										</option>
									))}
							</Form.Select>
						</Section>
						<Button
							type="button"
							variant="secondary"
							onClick={handleSubmit}
						>
							Add Recipe
						</Button>
					</React.Fragment>
				) : (
					<Spinner animation="border" />
				)}
			</Modal.Body>
		</Modal>
	);
};
