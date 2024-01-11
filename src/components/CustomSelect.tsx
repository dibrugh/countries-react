import styled from "styled-components";
import Select from "react-select";

// Можно оборачивать не только HTML элементы, но и компоненты целеком
export const CustomSelect = styled(Select).attrs({
	styles: {
		// Функции для более гибкой стилизации. `provided` - стили, предоставляемые библиотекой
		control: (provided) => ({
			...provided,
			backgroundColor: "var(--colors-ui-base)",
			color: "var(--colors-text)",
			borderRadius: "var(--radii)",
			padding: "0.25rem",
			border: "none",
			boxShadow: "var(--shadow)",
			height: "50px",
		}),
		// state - выбранная опция и невыбранная
		option: (provided, state) => ({
			...provided,
			cursor: "pointer",
			color: "var(--colors-text)",
			backgroundColor: state.isSelected
				? "var(--colors-bg)"
				: "var(--colors-ui-base)",
		}),
	},
})`
	width: 200px;
	border-radius: var(--radii);
	font-family: var(--family);
	border: none;

	/* Тень для выпадающего элемента, т.е для вложенных элементов и псевдоэлементов */
	& > * {
		box-shadow: var(--shadow);
	}

	& input {
		padding-left: 0.25rem;
	}

	& div {
		color: var(--colors-text);
	}

    /* Закрашиваем отступы выпадающего списка */
	& > div {
		background-color: var(--colors-ui-base);
	}
`;
