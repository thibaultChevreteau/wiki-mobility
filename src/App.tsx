import React, { useEffect, useState } from "react";
import solutionService from "./services/solution";
import { NewSolution, Solution } from "./types";

const App = () => {
	const [solutions, setSolutions] = useState<Solution[]>([]);
	const [newSolution, setNewSolution] = useState<NewSolution>({
		name: "",
		description: "",
	});

	useEffect(() => {
		const fetchSolutions = async () => {
			const solutions = await solutionService.getAll();
			setSolutions(solutions);
		};
		void fetchSolutions();
	}, []);

	const handleInputChange = (
		event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value } = event.target;
		setNewSolution({
			...newSolution,
			[name]: value,
		});
	};

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const addedSolution = await solutionService.addNew(newSolution);
		setSolutions([...solutions, addedSolution]);
		setNewSolution({ name: "", description: "" });
	};

	return (
		<div>
			<h1>Solutions</h1>
			<ul>
				{solutions.map((solution) => (
					<li key={solution.id}>
						<h2>{solution.name}</h2>
						<p>{solution.description}</p>
					</li>
				))}
			</ul>
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
		</div>
	);
};

export default App;
