import Section from "./Section";

export default ({ children }) => {
	return (
		<Section>
			<h1>{children}</h1>
			<hr />
		</Section>
	);
};
