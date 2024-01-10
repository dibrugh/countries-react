import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { Controls } from "../components/Controls";
import { ALL_COUNTRIES } from "../constants/api";
import { List } from "../components/List";
import { Card } from "../components/Card";

export const HomePage = ({ countries, setCountries }) => {
	const navigate = useNavigate();

	useEffect(() => {
        // Избегаем повторных запросов
        if (!countries.length)
		axios.get(ALL_COUNTRIES).then(({ data }) => setCountries(data));
	}, []);
    
	return (
		<>
			<Controls />
			<List>
				{countries.map((el) => {
					/* Подготовка данных */
					const countryInfo = {
						img: el.flags.png,
						name: el.name.common,
						info: [
							{
								title: "Population",
								description: el.population,
							},
							{
								title: "Region",
								description: el.region,
							},
							{
								title: "Capital",
								description: el.capital[0],
							},
						],
					};

					return (
						<Card
							key={el.name.common}
							{...countryInfo}
							onClick={() => navigate(`/country/${el.name.common}`)}
						/>
					);
				})}
			</List>
		</>
	);
};
