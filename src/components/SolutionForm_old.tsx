//Component to update when starting to add capacity to add solutions

import { useEffect, useState } from "react";
import { Solution } from "../types";
import solutionService from "../services/solution";
import { useAppDispatch, useAppSelector } from "../hooks";
import { setSolutions } from "../reducers/solutionsReducer";
import { useMatch } from "react-router-dom";

const SolutionForm = () => {
	const dispatch = useAppDispatch();
	const solutions = useAppSelector((state) => state.solutions);

	useEffect(() => {
		const fetchData = async () => {
			try {
				await dispatch(setSolutions());
				window.scrollTo(0, 0);
			} catch (error) {
				console.error("Error fetching solutions:", error);
			}
		};
		fetchData();
	}, [dispatch]);

	const [editedSolution, setEditedSolution] = useState<Solution>();

	const match = useMatch("solutions/:id/edit");
	const solution = match
		? solutions.find((solution) => solution.id === match.params.id)
		: null;

	solution ? setEditedSolution(solution) : null;

	const handleInputChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = event.target;
		setEditedSolution({
			...editedSolution,
			[name]: value,
		});
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const addedSolution = await solutionService.addNew(newSolution);
		setSolutions([...solutions, addedSolution]);
		setNewSolution({ name: "", description: "", img: "" });
	};

	return (
		<form onSubmit={handleSubmit}>
			<h2>Add a Solution</h2>
			<label htmlFor="name">Name:</label>
			<input
				type="text"
				id="name"
				name="name"
				value={newSolution.name}
				onChange={handleInputChange}
			/>
			<label htmlFor="description">Description:</label>
			<input
				id="description"
				name="description"
				value={newSolution.description}
				onChange={handleInputChange}
			/>
			<button type="submit">Add Solution</button>
		</form>
	);
};

export default SolutionForm;
