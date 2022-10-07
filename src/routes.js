import Checklist from "./pages/Checklist";
import Home from "./pages/Home";
import MealPlan from "./pages/MealPlan";
import NewRecipe from "./pages/NewRecipe";
import Recipe from "./pages/Recipe";
import Recipes from "./pages/Recipes";
import Success from "./pages/Success";

export default [
	{
		exact: true,
		path: "/",
		component: Home,
	},
	{
		path: "/recipes",
		component: Recipes,
	},
	{
		path: "/recipe/:id",
		component: Recipe,
	},
	{
		path: "/new-recipe",
		component: NewRecipe,
	},
	{
		path: "/meal-plan",
		component: MealPlan,
	},
	{
		path: "/success/:messageId",
		component: Success,
	},
	{
		path: "/checklist",
		component: Checklist,
	},
];
