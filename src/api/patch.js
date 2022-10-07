import customFetch from "./customFetch";

export default async (route, body) =>
	customFetch({
		method: "PATCH",
		route,
		body,
	});
