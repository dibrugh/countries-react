import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Container } from "./Container";
import { IoMoon, IoMoonOutline } from "react-icons/io5";

// Формируем элементы компонента
const HeaderEl = styled.header`
	box-shadow: var(--shadow);
	background-color: var(--colors-ui-base);
`;

const Wrapper = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 2rem 0;
`;

interface TitleProps {
	to?: string;
}

/* Стилизуем компонент react-router-dom */
const Title = styled(Link).attrs<TitleProps>({
	to: "/",
})`
	color: var(--colors-text);
	font-size: var(--fs-sm);
	text-decoration: none;
	font-weight: var(--fw-bold);
`;

const ModeSwitcher = styled.div`
	color: var(--colors-text);
	font-size: var(--fs-sm);
	cursor: pointer;
	text-transform: capitalize;
`;

export const Header: React.FC = () => {
	const [theme, setTheme] = useState<'dark' | 'light'>("light");

	const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

	useEffect(() => {
		document.body.setAttribute("data-theme", theme);
	}, [theme]);

	return (
		<HeaderEl>
			<Container>
				<Wrapper>
					<Title>Where is the world?</Title>
					<ModeSwitcher onClick={toggleTheme}>
						{theme === "light" ? (
							<IoMoonOutline size="14px" />
						) : (
							<IoMoon size="14px" />
						)}{" "}
						<span style={{ marginLeft: "0.75rem" }}>{theme} theme</span>
					</ModeSwitcher>
				</Wrapper>
			</Container>
		</HeaderEl>
	);
};