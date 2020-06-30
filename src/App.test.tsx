// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import React from 'react'

import { render, wait } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import MainApp from "./App"




test('Load the main component and all countries', async () => {
	const { container, getByText } = render(<MainApp />)
	let countryList = container ? container.querySelector('#countryList') : null
	await wait(() => expect(expect(countryList).toBeInTheDocument()))

	expect(countryList).toBeInTheDocument()


	await wait(() => expect(countryList?.childNodes.length).toBeGreaterThan(0))

	expect(countryList?.childNodes.length).toBeGreaterThan(0)
	const sortButton = getByText('Population')
	expect(sortButton).toBeInTheDocument()
	await userEvent.click(getByText('Population'))

})

describe("Sort Tests", () => {
	test('Sort population by ASC', async () => {

		const { container, getByText } = render(<MainApp />)
		let countryList = container ? container.querySelector('#countryList') : null
		await wait(() => expect(expect(countryList).toBeInTheDocument()))
		await wait(() => expect(countryList?.childNodes.length).toBeGreaterThan(0))
		const firstResultValue = countryList?.childNodes[0].textContent;
		const sortButton = getByText('Population')
		expect(sortButton).toBeInTheDocument()


		await userEvent.click(sortButton)
		await wait(() => expect(countryList?.childNodes.length).toBeGreaterThan(0))
		const secondFirstResultValue = countryList?.childNodes[0].textContent;
		expect(firstResultValue).not.toBe(secondFirstResultValue)
	})


	test('Sort population by DESC', async () => {

		const { container, getByText } = render(<MainApp />)
		let countryList = container ? container.querySelector('#countryList') : null
		await wait(() => expect(expect(countryList).toBeInTheDocument()))
		await wait(() => expect(countryList?.childNodes.length).toBeGreaterThan(0))
		const firstResultValue = countryList?.childNodes[0].textContent;
		const sortButton = getByText('Population')
		expect(sortButton).toBeInTheDocument()


		await userEvent.click(sortButton)
		await wait(() => expect(countryList?.childNodes.length).toBeGreaterThan(0))
		const secondFirstResultValue = countryList?.childNodes[0].textContent;
		expect(firstResultValue).not.toBe(secondFirstResultValue)
		await userEvent.click(sortButton)
		await wait(() => expect(countryList?.childNodes.length).toBeGreaterThan(0))
		const thirdFirstResultValue = countryList?.childNodes[0].textContent;
		expect(firstResultValue).not.toBe(secondFirstResultValue)
		expect(firstResultValue).not.toBe(thirdFirstResultValue)
		expect(secondFirstResultValue).not.toBe(thirdFirstResultValue)
	})

	test('Loop through population sort', async () => {

		const { container, getByText } = render(<MainApp />)
		let countryList = container ? container.querySelector('#countryList') : null
		await wait(() => expect(expect(countryList).toBeInTheDocument()))
		await wait(() => expect(countryList?.childNodes.length).toBeGreaterThan(0))
		const firstResultValue = countryList?.childNodes[0].textContent;
		const sortButton = getByText('Population')
		expect(sortButton).toBeInTheDocument()


		await userEvent.click(sortButton)
		await wait(() => expect(countryList?.childNodes.length).toBeGreaterThan(0))
		const secondFirstResultValue = countryList?.childNodes[0].textContent;

		await userEvent.click(sortButton)
		await wait(() => expect(countryList?.childNodes.length).toBeGreaterThan(0))
		const thirdFirstResultValue = countryList?.childNodes[0].textContent;

		await userEvent.click(sortButton)
		await wait(() => expect(countryList?.childNodes.length).toBeGreaterThan(0))
		const finalFirstResultValue = countryList?.childNodes[0].textContent;

		expect(firstResultValue).not.toBe(secondFirstResultValue)
		expect(firstResultValue).not.toBe(thirdFirstResultValue)
		expect(secondFirstResultValue).not.toBe(thirdFirstResultValue)
		expect(firstResultValue).toBe(finalFirstResultValue)
	})
})

describe("Filter Tests", () => {
	test('Filter the countries by country name', async () => {
		const countryName = "Algeria"
		const { container, getByRole, getAllByText } = render(<MainApp />)
		let countryList = container ? container.querySelector('#countryList') : null
		await wait(() => expect(expect(countryList).toBeInTheDocument()))

		await wait(() => expect(getByRole("textbox")).toBeInTheDocument())
		const filterBox = getByRole("textbox")
		expect(filterBox).toBeInTheDocument()

		userEvent.type(getByRole('textbox'), countryName)
		expect(getByRole('textbox')).toHaveValue(countryName)
		await wait(() => expect(getAllByText(countryName)).toHaveLength(1))
		//verify we only have one result
		expect(countryList?.childNodes).toHaveLength(1)

	})
	test('Filter the countries by country code', async () => {
		const countryCode = "COL"
		const { container, getByRole, getAllByText } = render(<MainApp />)
		let countryList = container ? container.querySelector('#countryList') : null
		await wait(() => expect(expect(countryList).toBeInTheDocument()))

		await wait(() => expect(getByRole("textbox")).toBeInTheDocument())
		const filterBox = getByRole("textbox")
		expect(filterBox).toBeInTheDocument()

		userEvent.type(getByRole('textbox'), countryCode)
		expect(getByRole('textbox')).toHaveValue(countryCode)
		await wait(() => expect(getAllByText("Colombia")).toHaveLength(1))
		//verify we only have one result
		expect(countryList?.childNodes).toHaveLength(1)

	})
	test(`Filter the countries by name and get multiple results back`, async () => {
		const countryCode = "a"
		const { container, getByRole, getAllByText } = render(<MainApp />)
		//Get the country list 
		let countryList = container ? container.querySelector('#countryList') : null
		await wait(() => expect(expect(countryList).toBeInTheDocument()))

		await wait(() => expect(getByRole("textbox")).toBeInTheDocument())
		const filterBox = getByRole("textbox")
		expect(filterBox).toBeInTheDocument()

		userEvent.type(getByRole('textbox'), countryCode)
		expect(getByRole('textbox')).toHaveValue(countryCode)


		await wait(() => expect(countryList?.childNodes.length).toBeGreaterThan(0))
		//verify we have more than one result
		expect(countryList?.childNodes.length).toBeGreaterThan(0)

	})
	test(`Filter the countries by name that doesn't exists`, async () => {
		const countryCode = "asjkdhakhdg"
		const { container, getByRole, getAllByText } = render(<MainApp />)
		//Get the country list 
		let countryList = container ? container.querySelector('#countryList') : null
		await wait(() => expect(expect(countryList).toBeInTheDocument()))

		const filterBox = getByRole("textbox")
		expect(filterBox).toBeInTheDocument()

		userEvent.type(getByRole('textbox'), countryCode)
		expect(getByRole('textbox')).toHaveValue(countryCode)
		await wait(() => expect(countryList?.childNodes.length).toEqual(0))

		//verify we no results
		expect(countryList?.childNodes.length).toEqual(0)

	})
})





