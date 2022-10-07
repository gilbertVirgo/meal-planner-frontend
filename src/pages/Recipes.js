import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import Header from "../components/Header";
import ListGroup from "react-bootstrap/ListGroup";
import React from "react";
import Section from "../components/Section";
import Spinner from "react-bootstrap/Spinner";
import get from "../api/get";

export default () => {
	const [recipes, setRecipes] = React.useState();

	React.useEffect(() => {
		get("recipes").then(setRecipes);
	}, []);

	return (
		<React.Fragment>
			<Header>Recipes</Header>

			<Section>
				{recipes ? (
					<ListGroup variant="flush">
						{recipes.map(({ title, id, ingredients }, index) => (
							<ListGroup.Item
								key={`lg-item-${index}`}
								action
								href={`/recipe/${id}`}
							>
								<p style={{ marginBottom: 0 }}>{title}</p>
								<Form.Text muted>
									{ingredients.length} ingredient
									{ingredients.length !== 1 && "s"}
								</Form.Text>
							</ListGroup.Item>
						))}
					</ListGroup>
				) : (
					<Spinner animation="border" role="status" />
				)}
			</Section>
			<hr />
			<Button href="/new-recipe">Create a new recipe</Button>
		</React.Fragment>
	);
};
