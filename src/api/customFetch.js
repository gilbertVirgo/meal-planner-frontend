// const baseURL = "https://lucy-meal-planner-backend.herokuapp.com";
const baseURL = "http://localhost:5000";

export default async ({ method, route, body }) => {
	const options = {
		method,
	};

	if (body) {
		options.headers = {
			"Content-Type": "application/json",
		};
		options.body = JSON.stringify(body);
	}

	const res = await (await fetch(`${baseURL}/${route}`, options)).json();

	if (res.success === false) {
		throw new Error(res.message);
	}

	return res.data;
};
