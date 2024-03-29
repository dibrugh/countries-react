const BASE_URL = "https://restcountries.com/v3.1/";

export const ALL_COUNTRIES =
	BASE_URL + "all?fields=name,capital,flags,population,region";

// NAME
export const searchByCountry = (countryName) =>
	BASE_URL + "name/" + countryName;

// LIST OF CODES
export const filterByCode = (codes) =>
	BASE_URL + "alpha?codes=" + codes.join(",");
