//Component to update when starting to add capacity to add solutions

// import { useState } from "react";
// import { NewSolution } from "../types";
//import solutionService from "../services/solution";
//import { useAppDispatch, useAppSelector } from "../hooks";

// const SolutionForm = () => {
//const dispatch = useAppDispatch();
//const solutions = useAppSelector((state) => state.solutions);

// const [newSolution, setNewSolution] = useState<NewSolution>({
// 	name: "",
// 	description: "",
// 	img: "",
// });

// const handleInputChange = (
// 	event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
// ) => {
// 	const { name, value } = event.target;
// 	setNewSolution({
// 		...newSolution,
// 		[name]: value,
// 	});
// };

// const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
// 	event.preventDefault();
//const addedSolution = await solutionService.addNew(newSolution);
//setSolutions([...solutions, addedSolution]);
// 		setNewSolution({ name: "", description: "", img: "" });
// 	};

// 	return (
// 		<form onSubmit={handleSubmit}>
// 			<h2>Add a Solution</h2>
// 			<label htmlFor="name">Name:</label>
// 			<input
// 				type="text"
// 				id="name"
// 				name="name"
// 				value={newSolution.name}
// 				onChange={handleInputChange}
// 			/>
// 			<label htmlFor="description">Description:</label>
// 			<input
// 				id="description"
// 				name="description"
// 				value={newSolution.description}
// 				onChange={handleInputChange}
// 			/>
// 			<button type="submit">Add Solution</button>
// 		</form>
// 	);
// };

// export default SolutionForm;
