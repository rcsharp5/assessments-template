/// <reference types="react-scripts" />


type State = {
	countries: Country[],
	activeCountries: Country[],
	highlightedCountry?: Country
}

type Action = {
	type: string,
	payload: any
}
interface IContextProps {
	state: State;
	dispatch: Dispatch<Action>
}
type CountryLanguage = {
	iso639_1: string,
	ps: string,
	iso639_2: string,
	name: string,
	nativeName: string
}
type Translation = {
	de: string,
	es: string,
	fr: string,
	ja: string,
	it: string,
	br: string,
	pt: string,
	nl: string,
	hr: string,
	fa: string,
}

type RegionalBloc = {
	acronym: string,
	name: string,
	otherAcronyms: string[],
	otherNames: string[]
}
type Currency = {
	code: string,
	name: string,
	symbol: string
}

type Country = {
	name: string,
	topLevelDomain: string[],
	alpha2Code: string,
	alpha3Code: string,
	callingCodes: number[],
	capital: string,
	altSpellings: string[],
	region: string,
	subregion: string,
	population: number,
	latlng: number[],
	demonym: string,
	area: number,
	gini: number,
	timezones: string[],
	borders: string[],
	nativeName: string,
	numericCode: number,
	currencies: Currency[]
	languages: CountryLanguage[],
	translations: Translation,
	flag: string,
	regionalBlocs: RegionalBloc[],
	cioc: string
}

type SortOption = 'ASC' | 'DESC' | null