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

const update = async (object: Solution, accessToken: string) => {
	const config = {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	};

	const { data } = await axios.put<Solution>(
		`${apiBaseUrl}/${object.id}`,
		object,
		config
	);

	return data;
};

const getPrivate = (accessToken: string) => {
	const config = {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	};

	const request = axios.get("/api/private", config);
	return request.then((response) => response.data);
};

const getPrivateScoped = (accessToken: string) => {
	const config = {
		headers: {
			Authorization: `Bearer ${accessToken}`,
		},
	};

	const request = axios.get("/api/private-scoped", config);
	return request.then((response) => response.data);
};

export default { getAll, addNew, update, getPrivate, getPrivateScoped };
