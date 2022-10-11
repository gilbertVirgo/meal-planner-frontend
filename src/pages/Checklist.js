import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Header from "../components/Header";
import ListGroup from "react-bootstrap/ListGroup";
import React from "react";
import Section from "../components/Section";
import Spinner from "react-bootstrap/Spinner";
import get from "../api/get";
import styled from "styled-components";

const CustomCheckbox = styled(Form.Check)`
	input[type="checkbox"] {
		/* scale: 1; */
		width: 20px;
		height: 20px;
		margin-right: 15px;

		&:checked + label {
			text-decoration: line-through;
		}
	}

	input,
	label {
		display: inline-block;
		vertical-align: middle;
	}
`;

export default () => {
	const [ingredients, setIngredients] = React.useState();

	React.useEffect(() => {
		get("plan/checklist").then(setIngredients);
	}, []);

	const noIngredients = ingredients && ingredients.length === 0;

	if (ingredients) console.log({ ingredients });

	return (
		<React.Fragment>
			<Header>Checklist</Header>
			<ListGroup variant="flush">
				{ingredients ? (
					ingredients.map(({ title, quantity }, index) => (
						<ListGroup.Item key={`cl-item-${index}`}>
							<CustomCheckbox
								label={
									<React.Fragment>
										<strong>{title}</strong> ({quantity})
									</React.Fragment>
								}
							/>
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
							<Button href="/meal-plan">Review meal plan</Button>
						</Section>
					</React.Fragment>
				)}
			</ListGroup>
		</React.Fragment>
	);
};
