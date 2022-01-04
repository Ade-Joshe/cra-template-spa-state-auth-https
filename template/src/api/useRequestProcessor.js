import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useDispatch } from "react-redux";
import { configureStore } from "../store";
import { LOADING, LOGOUT } from "../store/constants";

// axios.defaults.baseURL = process.env.BASE_URL
const store = configureStore();

axios.interceptors.request.use(
	(config) => {
		const result = store.getState();

		config.headers = {
			"x-access-token": result.token,
			Accept: "application/json",
			"Content-Type": "application/json",
			"Access-Control-Allow-Origin": "*"
		};
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

const handleErrorTypeCheck = (error, dispatch) => {
	if (error?.response) {
		if (
			error.response.status === 401 &&
            error.response?.data.error_no === 8
		) {
			dispatch({ type: LOGOUT });
		}
		const errorMessage = {
			status: error.response.status,
			...error.response.data
		};
		throw errorMessage;
	} else {
		const errorMessage = { message: error.message };
		throw errorMessage;
	}
};

/**
 *
 * @param {string} url
 * @param {string} queryName
 * @param {boolean} enabled
 */

export const useGetResquest = (url, queryName, enabled = true) => {
	const dispatch = useDispatch();
	const queryClient = useQueryClient();
	const data = queryClient.getQueryData(queryName);

	return useQuery(
		queryName,
		async () => {
			if (!data) {
				dispatch({ type: LOADING, payload: true });
			}
			return axios
				.get(url)
				.then((res) => {
					console.log(res.data);
					return res.data;
				})
				.catch((err) => handleErrorTypeCheck(err, dispatch));
		},
		{
			onError: (error) => {
				console.log(error);
				// toast.error(error.message)
			},
			onSettled: () => {
				dispatch({ type: LOADING, payload: false });
			},
			enabled
		}
	);
};

/**
 *
 * @param {string} url
 * @param {string|Array} queryNameToInvalidate
 */

export const usePostRequest = (url, queryNameToInvalidate) => {
	const queryClient = useQueryClient();
	const dispatch = useDispatch();
	return useMutation(
		(payload) => {
			dispatch({ type: LOADING, payload: true });
			return axios
				.post(url, payload)
				.then((res) => res.data)
				.catch((err) => handleErrorTypeCheck(err, dispatch));
		},
		{
			onSuccess: () =>
				queryClient.invalidateQueries(queryNameToInvalidate),
			onError: (error) => {
				console.log(error);
				// toast.error(error.message)
			},
			onSettled: () => {
				dispatch({ type: LOADING, payload: false });
			}
		}
	);
};

/**
 *
 * @param {string} url
 * @param {string|Array} queryNameToInvalidate
 */
export const useDeleteRequest = (url, queryNameToInvalidate) => {
	const queryClient = useQueryClient();
	const dispatch = useDispatch();
	return useMutation(
		(payload) => {
			dispatch({ type: LOADING, payload: true });
			return axios
				.delete(url, { data: payload })
				.then((res) => res.data)
				.catch((err) => handleErrorTypeCheck(err, dispatch));
		},
		{
			onSuccess: () =>
				queryClient.invalidateQueries(queryNameToInvalidate),
			onError: (error) => {
				console.log(error);
				// toast.error(error.message)
			},
			onSettled: () => {
				dispatch({ type: LOADING, payload: false });
			}
		}
	);
};

export const usePatchRequest = (url, queryNameToInvalidate) => {
	const queryClient = useQueryClient();
	const dispatch = useDispatch();
	return useMutation(
		(payload) => {
			dispatch({ type: LOADING, payload: true });
			return axios
				.patch(url, payload)
				.then((res) => res.data)
				.catch((err) => handleErrorTypeCheck(err, dispatch));
		},
		{
			onSuccess: () =>
				queryClient.invalidateQueries(queryNameToInvalidate),
			onError: (error) => {
				console.log(error);
				// toast.error(error.message)
			},
			onSettled: () => {
				dispatch({ type: LOADING, payload: false });
			}
		}
	);
};
