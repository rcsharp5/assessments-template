import React from 'react';
import { useStore } from "../../store/Store"
import "./countries.css"
function Pagination() {
	const { state, dispatch } = useStore();

	let countries = null



	return <div className="pages">
		{countries}
	</div>;
}

export default Pagination;
