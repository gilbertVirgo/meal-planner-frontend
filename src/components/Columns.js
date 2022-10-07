import styled from "styled-components";

export default styled.div`
	display: grid;
	grid-template-columns: 1fr;
	column-gap: 15px;
	row-gap: 15px;

	@media screen and (min-width: 768px) {
		grid-template-columns: 1fr 1fr;
	}
`;
