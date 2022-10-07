import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Header from "../components/Header";
import IngredientsBrowser from "../components/IngredientsBrowser";
import React from "react";
import Section from "../components/Section";
import Spinner from "react-bootstrap/Spinner";
import put from "../api/put";
import { useHistory } from "react-router-dom";

export default () => {
	const [title, setTitle] = React.useState("");
	const [chosenIngredients, setChosenIngredients] = React.useState([]);
	const [errorMessage, setErrorMessage] = React.useState("");
	const [loading, setLoading] = React.useState(false);

	const history = useHistory();
	const isFormFilled = () => title !== "" && chosenIngredients.length > 0;

	// when posting, remember ingredients -> ingredientIds
	const handleSubmit = (event) => {
		event.preventDefault();

		if (event.target.checkValidity() && isFormFilled()) {
			setLoading(true);

			put("recipe", {
				title,
				ingredients: chosenIngredients.map(({ id, amount, unit }) => ({
					id,
					amount,
					unit,
				})),
			})
				.then(() => history.push("/success/new-recipe"))
				.catch((err) => setErrorMessage(err.toString()))
				.finally(() => setLoading(false));
		} else {
			setErrorMessage("Please fill out all the fields.");
		}
	};

	React.useEffect(() => {
		setErrorMessage("");
	}, [title, chosenIngredients]);

	return (
		<Form onSubmit={handleSubmit}>
			<Header>New Recipe</Header>

			<Section>
				<Form.Label>Title</Form.Label>
				<Form.Control
					value={title}
					onChange={({ target: { value } }) => setTitle(value)}
					name="title"
					required
				/>
			</Section>

			<Section>
				<Form.Label>Ingredients</Form.Label>
				<IngredientsBrowser
					chosenIngredients={chosenIngredients}
					onChange={setChosenIngredients}
				/>
			</Section>

			<Section>
				<Button disabled={errorMessage || loading} type="submit">
					{loading ? (
						<Spinner
							as="span"
							animation="grow"
							size="sm"
							role="status"
							aria-hidden="true"
						/>
					) : (
						"Create new recipe"
					)}
				</Button>
			</Section>

			{errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
		</Form>
	);
};
