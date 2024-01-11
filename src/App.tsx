import { useEffect, useState } from "react";
import axios from "axios";
import { ALL_COUNTRIES } from "./constants/api";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Main } from "./components/Main";
import { HomePage } from "./pages/HomePage";
import { NotFound } from "./pages/NotFound";
import { Details } from "./pages/Details";


export interface Country {
	capital: [string];
	flags: {
		png: string;
		svg: string;
	};
	name: {
		common: string;
		official: string;
		nativeName?: {};
	};
	population: number;
	region: string;
}

const App: React.FC = () => {
	// Чтобы каждый раз не подгружать страны, выносим стейт на уровень выше (т.е App)
	const [countries, setCountries] = useState<Country[]>([]);

	useEffect(() => {
		// Избегаем повторных запросов
		if (!countries.length) {
			axios.get(ALL_COUNTRIES).then(({ data }) => {
				setCountries(data);
			});
		}
	}, []);
	return (
		<>
			<Header />
			<Main>
				<Routes>
					<Route
						path="/"
						element={
							<HomePage countries={countries} />
						}
					></Route>
					<Route path="/country/:name" element={<Details />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Main>
		</>
	);
}

export default App;
