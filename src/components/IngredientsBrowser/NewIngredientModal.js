import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import React from "react";
import Section from "../Section";
import put from "../../api/put";
import units from "./units";

export default ({ defaultValue, onNewIngredient, show, onHide }) => {
	const titleInputRef = React.useRef(null);

	const [title, setTitle] = React.useState("");
	const [lastUsedUnit, setLastUsedUnit] = React.useState("");

	const [errorMessage, setErrorMessage] = React.useState();

	const isFormValid = () => title !== "" && lastUsedUnit !== "";

	// Simulated submit, because you can't have a form within a form
	const handleSubmit = async () => {
		if (!isFormValid())
			return setErrorMessage(
				"Please make sure to fill out the required fields."
			);

		await put("ingredient", {
			title,
			lastUsedUnit,
		});

		setTitle(defaultValue);
		setLastUsedUnit("");

		onNewIngredient();
		onHide();
	};

	React.useEffect(() => {
		if (show) {
			setTimeout(() => titleInputRef.current.focus());
		}
	}, [show]);

	React.useEffect(() => {
		setTitle(defaultValue);
	}, [defaultValue]);

	return (
		<Modal show={show} onHide={onHide}>
			<Modal.Header closeButton>
				<h5>Create a new ingredient</h5>
			</Modal.Header>
			<Modal.Body>
				<Section>
					<Form.Label>Name</Form.Label>
					{/* for some reason the defaultValue isn't coming through here */}
					<Form.Control
						ref={titleInputRef}
						value={title}
						onChange={({ target: { value } }) => setTitle(value)}
					/>
				</Section>
				<Section>
					<Form.Label>Default unit</Form.Label>
					<Form.Select
						value={lastUsedUnit}
						onChange={({ target }) =>
							setLastUsedUnit(
								target.options[target.selectedIndex].text
							)
						}
					>
						{units.map((unit, index) => (
							<option key={`option-2-${index}`} value={unit}>
								{unit}
							</option>
						))}
					</Form.Select>
				</Section>
				{errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
			</Modal.Body>
			<Modal.Footer>
				<Button
					type="button"
					variant="secondary"
					onClick={handleSubmit}
				>
					Create new ingredient
				</Button>
			</Modal.Footer>
		</Modal>
	);
};
