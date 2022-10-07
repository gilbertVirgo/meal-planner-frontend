import customFetch from "./customFetch";

export default async (route, body) =>
	customFetch({
		method: "PUT",
		route,
		body,
	});
