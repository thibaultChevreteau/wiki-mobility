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

export default { getAll, addNew };
