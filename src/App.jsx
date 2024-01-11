import { useState } from "react";

import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Main } from "./components/Main";
import { HomePage } from "./pages/HomePage";
import { NotFound } from "./pages/NotFound";
import { Details } from "./pages/Details";


function App() {
	// Чтобы каждый раз не подгружать страны, выносим стейт на уровень выше (т.е App)
	const [countries, setCountries] = useState([]);

	return (
		<>
			<Header />
			<Main>
				<Routes>
					<Route
						path="/"
						element={
							<HomePage countries={countries} setCountries={setCountries} />
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
