import React, { useEffect } from 'react';
import { useStore, Store } from "./store/Store"
import api from "./utils/api"

import Countries from "./components/coutries/Countries"
import Filter from "./components/filter/Filter"
import CountryModal from "./components/countryModal/CountryModal"
import "./app.css"
/**
 * This application gets a list of countries and allows for a user to filter by country name and country code. Users can also sort by population
 * Eveything is store in a global store to keep components decoupled as much as possible
 * 
 * 
 * 
 */
function App() {
	const { state, dispatch } = useStore();
	useEffect(() => {
		let isCleanedUp: boolean = false;
		// Get the intial list of countries
		api.getCountryList().then((countries: Country[]) => {
			if (isCleanedUp) return;
			dispatch({ type: 'SET_COUNTRIES', payload: countries });
		})

		return function cleanup() {
			isCleanedUp = true;
		}
	}, []);

	return <div>
		<Filter />
		<Countries activeCountries={state.activeCountries} />
		<CountryModal country={state.highlightedCountry} />
	</div>;
}

// A wrapper around our global store
function AppWrapper() {
	return <Store>
		<App />
	</Store>;
}

export default AppWrapper;
