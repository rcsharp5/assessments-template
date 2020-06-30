
async function getCountryList(): Promise<Country[]> {
	return fetch("https://restcountries.eu/rest/v2/all")
		.then(response => response.json())
		.then(data => { return data });
}

function filterCountries(data: Country[], text: string, sort: SortOption): Country[] {

	let filtered: Country[] = text ? data.filter(o => {
		if (o.name.toLowerCase().indexOf(text?.toLowerCase()) > -1 || o.alpha3Code.toLowerCase().indexOf(text?.toLowerCase()) > -1) {
			return true
		}
		return false;
	}) : [...data]

	if (!sort) return filtered
	if (sort === "ASC") return filtered.sort((a: Country, b: Country) => a.population - b.population);
	return filtered.sort((a: Country, b: Country) => b.population - a.population);
}


export default {
	getCountryList,
	filterCountries
}