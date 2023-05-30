import styled from 'styled-components';

const StyledMessagesContainer = styled.div`
	border: 1px solid black;
	height: 400px;
	width: 100%;
	padding: 0 1rem;
	overflow-y: auto;
`;

const StyledChat = styled.div`
	display: flex;
	width: 50%;
`;

export { StyledMessagesContainer, StyledChat };
