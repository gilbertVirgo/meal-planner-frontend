import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Header from "../components/Header";
import ListGroup from "react-bootstrap/ListGroup";
import React from "react";
import Section from "../components/Section";
import Spinner from "react-bootstrap/Spinner";
import get from "../api/get";

export default () => {
	const [ingredients, setIngredients] = React.useState();

	React.useEffect(() => {
		get("plan/ingredients").then(setIngredients);
	}, []);

	const noIngredients = ingredients && ingredients.length === 0;

	return (
		<React.Fragment>
			<Header>Checklist</Header>
			<ListGroup variant="flush">
				{ingredients ? (
					ingredients.map(({ title }, index) => (
						<ListGroup.Item key={`cl-item-${index}`}>
							<Form.Check label={title} />
						</ListGroup.Item>
					))
				) : (
					<Spinner animation="border" />
				)}

				{noIngredients && (
					<React.Fragment>
						<Section>
							<Form.Text muted>No ingredients yet.</Form.Text>
						</Section>
						<Section>
							<Button href="/meal-plan">
								Review this week's meal plan
							</Button>
						</Section>
					</React.Fragment>
				)}
			</ListGroup>
		</React.Fragment>
	);
};
