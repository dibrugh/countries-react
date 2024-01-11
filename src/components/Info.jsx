import styled from "styled-components";
import axios from "axios";
import { useEffect, useState } from "react";
import { filterByCode } from "../constants/api";
import { useNavigate } from "react-router-dom";
import { Country } from "../App";

const Wrapper = styled.section`
	margin-top: 3rem;
	width: 100%;
	display: grid;
	grid-template-columns: 100%;
	gap: 2rem;

	@media (min-width: 767px) {
		// картинка 100-400, остальной текст - 1fr
		grid-template-columns: minmax(100px, 400px) 1fr;
		align-items: center;
		gap: 5rem;
	}

	@media (min-width: 1024px) {
		grid-template-columns: minmax(400px, 600px) 1fr;
	}
`;

const InfoImage = styled.img`
	display: block;
	width: 100%;
	height: 100%;
	object-fit: contain;
`;

const InfoTitle = styled.h1`
	margin: 0;
	font-weight: var(--fw-normal);
`;

const ListGroup = styled.div`
	display: flex;
	flex-direction: column;
	gap: 2rem;

	@media (min-width: 1024px) {
		flex-direction: row;
		gap: 4rem;
	}
`;

const List = styled.ul`
	list-style: none;
	margin: 0;
	padding: 0;
`;

const ListItem = styled.li`
	line-height: 1.8;

	& > b {
		font-weight: var(--fw-bold);
	}
`;

/* name - name.common или name.official 
    nativeName - name.nativeName.eng
    flag - flags.svg
    capital - capital[0]
    topLevelDomain, borders - такого нет
    
*/
// Border countries
const Meta = styled.div`
	margin-top: 3rem;
	display: flex;
	gap: 1.5rem;
	flex-direction: column;
	align-items: flex-start;

	& > b {
		font-weight: var(--fw-bold);
	}

	@media (min-width: 767px) {
		flex-direction: row;
		align-items: center;
	}
`;

const TagGroup = styled.div`
	display: flex;
	gap: 1rem;
	flex-wrap: wrap;
`;

const Tag = styled.span`
	padding: 0 1rem;
	background: var(--colors-ui-base);
	box-shadow: var(--shadow);
	line-height: 1.5;
	cursor: pointer;
`;

/* interface IInfo extends Country {
	subregion: string;
	tld: [string];
	currencies: {};
	languages: {
		language: string;
	};
	borders?: [];
} */

export const Info = (props/* : IInfo */) => {
	const {
		name: { common, nativeName },
		flags,
		capital,
		population,
		region,
		subregion,
		tld,
		currencies = [],
		languages = [],
		borders = [],
	} = props;
	console.log(props);
	const [neighbors, setNeighbors] = useState([]);

	useEffect(() => {
		if (borders.length) {
			/* Делаем запрос по массиву кодов, чтобы получить страны */
			axios
				.get(filterByCode(borders))
				.then(({ data }) =>
					setNeighbors(data.map((country) => country.name.common))
				);
		}
	}, [borders]);

	const navigate = useNavigate();

	return (
		<Wrapper>
			<InfoImage src={flags.svg} alt={common} />
			<div>
				<InfoTitle>{common}</InfoTitle>
				<ListGroup>
					<List>
						<ListItem>
							{/* Исправить nativeName т.к не всегда есть eng */}
							<b>Native Name: </b> {Object.values(nativeName)[0].common}
						</ListItem>
						<ListItem>
							<b>Population: </b> {population}
						</ListItem>
						<ListItem>
							<b>Region: </b> {region}
						</ListItem>
						<ListItem>
							<b>Subregion: </b> {subregion}
						</ListItem>
						<ListItem>
							{/* Macau не имеет столицы */}
							<b>Capital: </b> {capital?.[0]}
						</ListItem>
					</List>
					<List>
						<ListItem>
							{/* {tld.map(domain => (<span key={domain}>{domain} </span>))} */}
							<b>Top level domain: </b> <span>{tld[0]} </span>
						</ListItem>
						<ListItem>
							<b>Currency: </b>{" "}
							{Object.entries(currencies).map((currency) => (
								<span key={currency[0]}>
									{currency[0]} ({currency?.[1]?.name})
								</span>
							))}
						</ListItem>
						<ListItem>
							{/* Возможно, нужно будет пофиксить */}
							<b>Languages: </b>{" "}
							{Object.values(languages).map((lang) => (
								<span key={lang}>{lang} </span>
							))}
						</ListItem>
					</List>
				</ListGroup>
				<Meta>
					<b>Border Countries</b>
					{!borders.length ? (
						<span>There are no border countries</span>
					) : (
						<TagGroup>
							{neighbors.map((border) => (
								<Tag
									key={border}
									onClick={() => navigate(`/country/${border}`)}
								>
									{border}{" "}
								</Tag>
							))}
						</TagGroup>
					)}
				</Meta>
			</div>
		</Wrapper>
	);
};
