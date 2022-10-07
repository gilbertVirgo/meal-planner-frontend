import Header from "../components/Header";
import React from "react";
import Table from "react-bootstrap/Table";
import get from "../api/get";
import { useParams } from "react-router-dom";

export default () => {
	const { id } = useParams();

	const [recipe, setRecipe] = React.useState();
	const [ingredients, setIngredients] = React.useState();

	React.useEffect(() => {
		get(`recipe/${id}`).then(setRecipe);
		get(`recipe/${id}/ingredients`).then(setIngredients);
	}, []);

	return recipe && ingredients ? (
		<React.Fragment>
			<Header>{recipe.title}</Header>

			<Table bordered striped>
				<thead>
					<tr>
						{["Ingredient", "Amount", "Unit"].map(
							(title, index) => (
								<td key={`table-title-${index}`}>
									<strong>{title}</strong>
								</td>
							)
						)}
					</tr>
				</thead>
				<tbody>
					{ingredients.map(({ id, title }, index) => {
						const { amount, unit } = recipe.ingredients.find(
							(i) => i.id === id
						);

						return (
							<tr key={`table-row-${index}`}>
								<td>{title}</td>
								<td>{amount}</td>
								<td>{unit}</td>
							</tr>
						);
					})}
				</tbody>
			</Table>
		</React.Fragment>
	) : (
		"Loading"
	);
};
