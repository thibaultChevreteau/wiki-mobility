import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Solutions from "./components/Solutions";
import Solution from "./components/Solution";
import {
	useAppDispatch,
	useAppSelector,
	useFindSolutionByUrlPattern,
} from "./hooks";
import { useEffect } from "react";
import { setSolutions } from "./reducers/solutionsReducer";
import NotFound from "./components/NotFound";
import SolutionForm from "./components/SolutionForm";
import { Category, NewSolution, Region } from "./types";
import About from "./components/About";

const App = () => {
	const defaultSolution: NewSolution = {
		name: "",
		description: "",
		category: Category.Other,
		img: "/default_image.png",
		imgId: "",
		region: Region.Other,
		googlePlusCode: "W4PR+PC Sers",
	};

	const dispatch = useAppDispatch();
	const solutions = useAppSelector((state) => state.solutions);

	useEffect(() => {
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
				<Route path="/a-propos" element={<About />} />
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
				<Route
					path="/nouvelle-solution"
					element={<SolutionForm solution={defaultSolution} />}
				/>
				<Route path="*" element={<NotFound />} />
			</Routes>
		</div>
	);
};

export default App;
