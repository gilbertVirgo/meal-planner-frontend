import { Route, Switch } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Nav from "./components/Nav";
import React from "react";
import routes from "./routes";

function App() {
	return (
		<React.Fragment>
			<Nav />
			<Container>
				<Switch>
					{routes.map((props, index) => (
						<Route key={`route-${index}`} {...props} />
					))}
				</Switch>
			</Container>
		</React.Fragment>
	);
}

export default App;
