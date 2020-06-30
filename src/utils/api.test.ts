import api from "./api"

test('Get all countries', async () => {
	let countryList: Country[] = await api.getCountryList()
	expect(countryList.length).toBeGreaterThan(0)
})

describe("Filter Tests", () => {
	test('Filter countries by name', async () => {
		let countryName: string = "Algeria"
		let countryList: Country[] = await api.getCountryList()
		let filteredList: Country[] = api.filterCountries(countryList, countryName, null)
		expect(filteredList).toHaveLength(1)
	})
	test('Filter countries by code', async () => {
		let countryCode: string = "COL"
		let countryList: Country[] = await api.getCountryList()
		let filteredList: Country[] = api.filterCountries(countryList, countryCode, null)
		expect(filteredList).toHaveLength(1)
	})
	test('Filter countries and find no results', async () => {
		let countryCode: string = "COL1234"
		let countryList: Country[] = await api.getCountryList()
		let filteredList: Country[] = api.filterCountries(countryList, countryCode, null)
		expect(filteredList).toHaveLength(0)
	})
})

describe("Sort Tests", () => {
	test('Sort countries by ASC', async () => {
		let sort: SortOption = "ASC"
		let countryList: Country[] = await api.getCountryList()
		let filteredList: Country[] = api.filterCountries(countryList, "", sort)
		expect(filteredList.length).toBeGreaterThan(1)
		expect(filteredList[1].population).toBeGreaterThanOrEqual(filteredList[0].population)
	})
	test('Sort countries by DESC', async () => {
		let sort: SortOption = "DESC"
		let countryList: Country[] = await api.getCountryList()
		let filteredList: Country[] = api.filterCountries(countryList, "", sort)
		expect(filteredList.length).toBeGreaterThan(1)
		expect(filteredList[0].population).toBeGreaterThan(filteredList[1].population)
	})

	test('Filter countries and find no results', async () => {
		let countryCode: string = "COL1234"
		let countryList: Country[] = await api.getCountryList()
		let filteredList: Country[] = api.filterCountries(countryList, countryCode, null)
		expect(filteredList).toHaveLength(0)
	})
})

describe("Sort And FilterTests", () => {
	test('Sort countries by ASC and filter', async () => {
		let sort: SortOption = "ASC"
		let countryName: string = "a"
		let countryList: Country[] = await api.getCountryList()
		let filteredList: Country[] = api.filterCountries(countryList, countryName, sort)
		expect(filteredList.length).toBeLessThan(countryList.length)
		expect(filteredList[1].population).toBeGreaterThanOrEqual(filteredList[0].population)
	})

	test('Sort countries by DESC and filter', async () => {
		let sort: SortOption = "DESC"
		let countryName: string = "a"
		let countryList: Country[] = await api.getCountryList()
		let filteredList: Country[] = api.filterCountries(countryList, countryName, sort)
		expect(filteredList.length).toBeGreaterThan(1)
		expect(filteredList[0].population).toBeGreaterThan(filteredList[1].population)
	})

	test('Filter and sort countries and find no results', async () => {
		let countryCode: string = "COL1234"
		let sort: SortOption = "DESC"
		let countryList: Country[] = await api.getCountryList()
		let filteredList: Country[] = api.filterCountries(countryList, countryCode, sort)
		expect(filteredList).toHaveLength(0)
	})
})
