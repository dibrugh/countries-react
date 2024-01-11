import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

import { IoArrowBack } from "react-icons/io5";
import { searchByCountry } from "../constants/api";
import { Button } from "../components/Button";
import { Info } from "../components/Info";

export const Details = () => {
	const { name } = useParams();
	const navigate = useNavigate();

	const [country, setCountry] = useState(null);
	useEffect(() => {
		axios.get(searchByCountry(name as string)).then(({ data }) => setCountry(data[0]));
	}, [name]);

	return (
		<div>
			<Button onClick={() => navigate(-1)}>
				<IoArrowBack /> Back
			</Button>
			{country && <Info {...country as object} />}
		</div>
	);
};
