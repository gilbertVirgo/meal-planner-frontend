import Button from "react-bootstrap/esm/Button";
import Card from "react-bootstrap/Card";
import Columns from "../../components/Columns";
import Header from "../../components/Header";
import React from "react";
import actions from "./actions";

export default () => {
	return (
		<React.Fragment>
			<Header>Welcome</Header>

			<Columns>
				{actions.map(({ title, link }, index) => (
					<Card key={`action-${index}`} variant="secondary">
						<Card.Body>
							<h4>{title}</h4>
						</Card.Body>
						<Card.Footer>
							<Button href={link.href}>{link.text}</Button>
						</Card.Footer>
					</Card>
				))}
			</Columns>
		</React.Fragment>
	);
};
