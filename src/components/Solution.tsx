import { useMatch } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import { setSolutions } from "../reducers/solutionsReducer";
import { useEffect } from "react";
import ReactMarkdown from "react-markdown";
import SolutionContact from "./SolutionContact";

const Solution = () => {
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

	const match = useMatch("solutions/:id");
	const solution = match
		? solutions.find((solution) => solution.id === match.params.id)
		: null;

	const isLoading = solutions.length === 0;

	return (
		<div>
			{!isLoading && !solution && <div>Solution not found</div>}
			{solution && (
				<div className="solution">
					<div className="solution__title">
						<h1>{solution.name}</h1>
						{solution.region !== "autre" ? (
							<img src={`/${solution.region}_badge.svg`} alt={solution.name} />
						) : null}
					</div>
					<p className="solution__description">{solution.description}</p>
					<div className="solution__image-and-map">
						<img
							className="solution__image"
							src={solution.img}
							alt={solution.name}
						/>
						<SolutionContact solution={solution} />
					</div>
					{solution.details ? (
						<ReactMarkdown className="solution__details">
							{solution.details}
						</ReactMarkdown>
					) : null}
				</div>
			)}
		</div>
	);
};

export default Solution;
