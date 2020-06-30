import React from 'react';
import { useStore } from "../../store/Store"

interface CountryProps {
	country: Country
}
/**
 * 
 * The container for each country item
 * Click on a country to open up the details
 */
const Country = ({ country }: CountryProps) => {
	const { dispatch } = useStore();
	return (<div className={"country card"} onClick={() => dispatch({ type: "TOGGLE_COUNTRY", payload: country })}>
		<div className="countryHeader">
			<img alt="Country Flag" src={country.flag} />
			<div className="countryName">{country.name}</div>
		</div>
	</ div>);
}
export default Country

