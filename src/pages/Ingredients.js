import React from "react";

export default () => {
	const [ingredients, setIngredients] = React.useState([]);

	React.useEffect(() => {
		(async function () {
			const { success, data } = await (
				await fetch("http://localhost:5000/ingredients")
			).json();

			setIngredients(data);
		})();
	}, []);

	return ingredients.length ? ingredients.map() : "Loading";
};
