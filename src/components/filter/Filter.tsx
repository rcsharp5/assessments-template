import React, { useEffect, useState, ChangeEvent, MouseEvent } from 'react';
import { useStore } from "../../store/Store"
import api from "../../utils/api"

import "./filter.css"
/**
 * this handles the view for filtering/sorting
 */
function Filter() {
	const [filter, setFilter] = useState<string>("");
	const [sort, setSort] = useState<SortOption>(null);
	const { state, dispatch } = useStore();

	const handleOnChange = (evt: ChangeEvent<HTMLInputElement>) => {
		if (!state.countries) return;
		setFilter(evt.target.value)
	}

	useEffect(() => {
		if (!state.countries) return;
		//Update our active list of countries
		dispatch({ type: 'SET_ACTIVE_COUNTRIES', payload: api.filterCountries(state.countries, filter, sort) });
		return function cleanup() {

		}
	}, [state.countries, sort, filter]);

	const handleSortClick = (evt: MouseEvent<HTMLButtonElement>) => {
		switch (sort) {
			case "ASC":
				return setSort("DESC")
			case "DESC":
				return setSort(null)
			default:
				setSort("ASC")
		}

	}


	return <div className="filterContainer">
		<input placeholder="Filter Countries by Name or Code" onChange={handleOnChange} />
		<div className="sortSection">
			<div className="sortTitle">Sort:</div>
			<button className="sortButton" onClick={handleSortClick}>Population<i className={sort === "ASC" ? "arrow-up" : sort === "DESC" ? "arrow-down" : ""} /></button>
		</div>
	</div>
}

export default Filter;
