import customFetch from "./customFetch";

export default async (route) =>
	customFetch({
		method: "GET",
		route,
	});
