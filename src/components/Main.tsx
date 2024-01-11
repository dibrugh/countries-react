import React from "react";
import { Container } from "./Container";

import styled from "styled-components";

const Wrapper = styled.main`
	padding: 2rem 0;

	@media (min-width: 767px) {
		padding: 4rem 0;
	}
`;

interface IMain {
	children: React.ReactNode;
}

export const Main = ({ children }: IMain) => {
	return (
		<Wrapper>
			<Container>{children}</Container>
		</Wrapper>
	);
};
