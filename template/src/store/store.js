import axios from "axios";
import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const storedData = localStorage.getItem("p1o2q0w9e3")
	? JSON.parse(localStorage.getItem("p1o2q0w9e3"))
	: {};
if (storedData?.auth?.token) {
	axios.defaults.headers.Authorization = `Bearer ${storedData.auth.token}`;
}

const configureStore = () => {
	const logger = (store) => (next) => (action) => {
		const result = next(action);
		// log
		// console.group(action.type);
		// console.info('dispatching', action);
		// console.log('next action', store.getState());
		// console.groupEnd();
		// !log end

		localStorage.setItem("p1o2q0w9e3", JSON.stringify(store.getState()));
		return result;
	};

	return createStore(
		rootReducer,
		{ ...storedData },
		compose(applyMiddleware(...[thunk, logger]))
	);
};

export { configureStore };
