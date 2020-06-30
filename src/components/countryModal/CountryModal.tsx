import React, { MouseEvent } from 'react';
import { useStore } from "../../store/Store"
import "./countryModal.css"

/**
 * This is the modal for showing the details for each country
 */
interface CountryProps {
	country?: Country
}
interface LanguagesProps {
	languages: CountryLanguage[]
}
interface LanguageProps {
	language: CountryLanguage
}
interface CurrenciesProps {
	currencies: Currency[]
}
interface CurrencyProps {
	currency: Currency
}
interface AttributeProps {
	name: string,
	value: string | number
}
interface TitleSectionProps {
	flag: string,
	name: string,
	region: string,
	subRegion: string
}

const Language = ({ language }: LanguageProps) => {
	return <tr >
		<td className="sectionValue">{language.iso639_1}</td>
		<td className="sectionValue">{language.iso639_2}</td>
		<td className="sectionValue">{language.name}</td>
		<td className="sectionValue">{language.nativeName}</td>
		<td className="sectionValue">{language.ps}</td>
	</tr>
}

const Languages = ({ languages }: LanguagesProps) => {
	return <div className="countrySection">
		<div className="countrySectionTitle">Languages</div>
		<table>
			<tr>
				<th>Iso639_1</th>
				<th>Iso639_2</th>
				<th>Name</th>
				<th>Native Name</th>
				<th>ps</th>
			</tr>
			{languages.map((language: CountryLanguage) => <Language language={language} />)}
		</table>
	</div>
}

const Currency = ({ currency }: CurrencyProps) => {
	return <tr >
		<td className="sectionValue">{currency.code}</td>
		<td className="sectionValue">{currency.name}</td>
		<td className="sectionValue">{currency.symbol}</td>
	</tr>
}


const Currencies = ({ currencies }: CurrenciesProps) => {
	return <div className="countrySection">
		<div className="countrySectionTitle">Currencies</div>
		<table>
			<tr>
				<th>Code</th>
				<th>Name</th>
				<th>Symbol</th>
			</tr>
			{currencies.map((currency: Currency) => <Currency currency={currency} />)}
		</table>
	</div>
}

const Attribute = ({ name, value }: AttributeProps) => {
	return <div className="attribute">
		<div className="attributeName">{name}</div>
		<div className="sectionValue">{value}</div>
	</div>
}

const TitleSection = ({ name, region, subRegion, flag }: TitleSectionProps) => {
	return <div className="titleSection">
		<img alt="Country Flag" src={flag} />
		<div className="title">
			<div className="name">{name}</div>
			<div className="subName">{region} - {subRegion}</div>
		</div>
	</div>
}

const CountryModal = ({ country }: CountryProps) => {
	const { dispatch } = useStore();
	if (!country) return null;
	return (<div className="modal" onClick={() => dispatch({ type: "TOGGLE_COUNTRY", payload: null })}>
		<div className="container" onClick={(e: MouseEvent) => e.stopPropagation()}>
			<TitleSection name={country.name} region={country.region} subRegion={country.subregion} flag={country.flag} />
			<div className="attributeSection">
				<Attribute name="Capital City" value={country.capital} />
				<Attribute name="Population" value={country.population} />
			</div>
			<Languages languages={country.languages} />
			<Currencies currencies={country.currencies} />
		</div>
	</ div>)
}
export default CountryModal

