import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Navbar from "react-bootstrap/Navbar";
import Section from "../Section";

export default () => (
	<Section>
		<Navbar bg="light" expand="lg">
			<Container style={{ justifyContent: "space-between" }}>
				<Navbar.Brand href="/">Meal Planner</Navbar.Brand>
				<Navbar.Toggle />
				<Navbar.Collapse>
					<Nav>
						<Nav.Link href="/recipes">Recipes</Nav.Link>
						<NavDropdown title="This Week">
							{[
								{ title: "Checklist", href: "/checklist" },
								{ title: "Meal Plan", href: "/meal-plan" },
							].map(({ title, href }, index) => (
								<NavDropdown.Item
									key={`dd-item-${index}`}
									href={href}
								>
									{title}
								</NavDropdown.Item>
							))}
						</NavDropdown>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	</Section>
);
