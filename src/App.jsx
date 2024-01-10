import axios from "axios";
import { useEffect, useState } from "react";

import { Controls } from "./components/Controls";
import { Header } from "./components/Header";
import { Main } from "./components/Main";
import { ALL_COUNTRIES } from "./constants/api";
import { List } from "./components/List";
import { Card } from "./components/Card";

function App() {
	const [countries, setCountries] = useState([]);

	console.log(countries);
	useEffect(() => {
		axios.get(ALL_COUNTRIES).then(({ data }) => setCountries(data));
	}, []);

	return (
		<>
			<Header />
			<Main>
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

						return <Card key={el.name.common} {...countryInfo}/>;
					})}
				</List>
			</Main>
		</>
	);
}

export default App;
