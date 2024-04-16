import axios from "axios";
import { Solution, NewSolution } from "../types";
const apiBaseUrl = "/api/solutions";

const getAll = () => {
	const request = axios.get(apiBaseUrl);
	return request.then((response) => response.data);
};

const addNew = async (object: NewSolution) => {
	const { data } = await axios.post<Solution>(`${apiBaseUrl}`, object);

	return data;
};

const getPrivate = (accessToken) => {
	const config = {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	};

	const request = axios.get("/api/private", config);
	return request.then((response) => response.data);
};

const getPrivateScoped = (accessToken) => {
	const config = {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	};

	const request = axios.get("/api/private-scoped", config);
	return request.then((response) => response.data);
};

export default { getAll, addNew, getPrivate, getPrivateScoped };
