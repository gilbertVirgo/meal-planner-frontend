import { Link } from "react-router-dom";

export default [
	{
		id: "new-recipe",
		text: "New recipe added successfully",
		link: <Link to={"/recipes"}>Go to recipes</Link>,
	},
];
