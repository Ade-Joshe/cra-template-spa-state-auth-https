import axios from "axios";
import { LOGIN, LOGOUT } from "../constants";

const initialState = {
	isLoggedIn: null,
	profile: null,
	token: null
};

const AuthReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOGIN:
			return {
				...state,
				profile: action.payload.data,
				token: action.payload.token
			};
		case LOGOUT:
			axios.defaults.headers.Authorization = "";
			return initialState;
		default:
			return state;
	}
};

export default AuthReducer;
