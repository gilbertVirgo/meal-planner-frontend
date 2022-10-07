import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ListGroup from "react-bootstrap/ListGroup";
import ListGroupItem from "react-bootstrap/esm/ListGroupItem";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

const AddSymbolWrapper = styled.div`
	position: absolute;
	right: 15px;
	top: 50%;
	transform: translateY(-50%);
`;

export const AddSymbol = () => (
	<AddSymbolWrapper>
		<FontAwesomeIcon icon={faPlus} />
	</AddSymbolWrapper>
);

export const CustomListGroup = styled(ListGroup)`
	position: absolute;
	z-index: 1000;
	box-shadow: 0 4px 10px #00000020;

	max-height: 300px;
	overflow-y: scroll;

	button {
		padding-right: 40px;
	}
`;

CustomListGroup.ClickTrap = styled.div`
	position: fixed;
	z-index: 998;
	left: 0;
	top: 0;
	width: 100vw;
	height: 100vh;
`;
