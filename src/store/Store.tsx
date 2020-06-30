import React, { Reducer, createContext, useReducer, useContext } from 'react';

const reducer: Reducer<State, Action> = (state: State, action: Action) => {
	switch (action.type) {
		case 'SET_COUNTRIES':
			return {
				...state,
				countries: action.payload,
				activeCountries: action.payload
			}
		case "TOGGLE_COUNTRY":
			return {
				...state,
				highlightedCountry: action.payload === state.highlightedCountry ? null : action.payload
			}
		case "SET_ACTIVE_COUNTRIES":
			return {
				...state,
				activeCountries: action.payload
			}
		default:
			return state;
	}
};

const initialState: State = { countries: [], activeCountries: [] };

const store = createContext({ state: initialState, dispatch: "" } as IContextProps);
const { Provider } = store;
export const useStore = (): IContextProps => useContext(store);
export const Store = ({ children }: any) => {
	const [state, dispatch] = useReducer(reducer, initialState);
	return <Provider value={{ state, dispatch }}>{children}</Provider>;
};



