import React from 'react';
import Country from "./Country"
import "./countries.css"

interface CountiesProps {
	activeCountries: Country[]
}

/**
 * the container for out country list
 */
export default ({ activeCountries }: CountiesProps) => {
	return <div className="countries" id="countryList">
		{activeCountries.map((country: Country) => <Country key={country.alpha3Code} country={country} />)}
	</div>;
};
