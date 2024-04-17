import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Solutions from "./components/Solutions";
import Solution from "./components/Solution";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import {
	useAppDispatch,
	useAppSelector,
	useFindSolutionByUrlPattern,
} from "./hooks";
import { useEffect } from "react";
import { setSolutions } from "./reducers/solutionsReducer";
import NotFound from "./components/NotFound";
import SolutionForm from "./components/SolutionForm";

const App = () => {
	const dispatch = useAppDispatch();
	const solutions = useAppSelector((state) => state.solutions);

	useEffect(() => {
		console.log("fetching");

		const fetchData = async () => {
			try {
				await dispatch(setSolutions());
			} catch (error) {
				console.error("Error fetching solutions:", error);
			}
		};
		fetchData();
	}, [dispatch]);

	const consultedSolution = useFindSolutionByUrlPattern(
		"solutions/:id",
		solutions
	);
	const editedSolution = useFindSolutionByUrlPattern(
		"solutions/:id/edit",
		solutions
	);

	return (
		<div>
			<NavBar />
			<LoginButton />
			<LogoutButton />
			<Routes>
				<Route path="/" element={<Solutions solutions={solutions} />} />
				<Route
					path="/solutions/:id"
					element={
						consultedSolution ? (
							<Solution solution={consultedSolution} />
						) : (
							<NotFound />
						)
					}
				/>
				<Route
					path="/solutions/:id/edit"
					element={
						editedSolution ? (
							<SolutionForm solution={editedSolution} />
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
