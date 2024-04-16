import { Route, Routes, useMatch } from "react-router-dom";
import NavBar from "./components/NavBar";
import Solutions from "./components/Solutions";
import Solution from "./components/Solution";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import Profile from "./components/Profile";
import { useAppDispatch, useAppSelector } from "./hooks";
import { useEffect, useState } from "react";
import { setSolutions } from "./reducers/solutionsReducer";
import { Solution as SolutionType } from "./types";
import NotFound from "./components/NotFound";
import SolutionForm from "./components/SolutionForm";

const App = () => {
	const dispatch = useAppDispatch();
	const solutions = useAppSelector((state) => state.solutions);
	const [selectedSolution, setSelectedSolution] = useState<SolutionType>();

	const match = useMatch("solutions/:id");
	const solution = match
		? solutions.find((solution) => solution.id === match.params.id)
		: null;

	useEffect(() => {
		const fetchData = async () => {
			try {
				await dispatch(setSolutions());
			} catch (error) {
				console.error("Error fetching solutions:", error);
			}
		};
		fetchData();
		solution ? setSelectedSolution(solution) : null;
	}, [dispatch, solution]);

	return (
		<div>
			<NavBar />
			<LoginButton />
			<LogoutButton />
			<Profile />
			<Routes>
				<Route path="/" element={<Solutions solutions={solutions} />} />
				<Route
					path="/solutions/:id"
					element={
						selectedSolution ? (
							<Solution solution={selectedSolution} />
						) : (
							<NotFound />
						)
					}
				/>
				<Route
					path="/solutions/:id/edit"
					element={
						selectedSolution ? (
							<SolutionForm solution={selectedSolution} />
						) : (
							<NotFound />
						)
					}
				/>
				<Route path="*" element={<NotFound />} />
			</Routes>
		</div>
	);
};

export default App;
