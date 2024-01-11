import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Controls } from "../components/Controls";
import { ALL_COUNTRIES } from "../constants/api";
import { List } from "../components/List";
import { Card } from "../components/Card";

export const HomePage = ({ countries, setCountries }) => {
	const [filteredCountries, setFilteredCountries] = useState(countries);
	const navigate = useNavigate();

	useEffect(() => {
		// Избегаем повторных запросов
		if (!countries.length) {
			axios.get(ALL_COUNTRIES).then(({ data }) => {
				setCountries(data);
			});
		}
	}, []);

	// Т.к изначально мы получаем пустой массив, нужно обновить стейт после получения данных с сервера
	useEffect(() => {
		handleSearch();
	}, [countries]);

	const handleSearch = (search, region) => {
		let data = [...countries];

		if (region) {
			data = data.filter((country) => country.region.includes(region));
		}
		// Проверяем совпадение с текстом поисковой строки
		if (search) {
			data = data.filter((country) =>
				country.name.common.toLowerCase().includes(search.toLowerCase())
			);
		}
		// Отфильтрованные страны
		setFilteredCountries(data);
	};

	return (
		<>
			<Controls onSearch={handleSearch} />
			<List>
				{filteredCountries.map((el) => {
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
