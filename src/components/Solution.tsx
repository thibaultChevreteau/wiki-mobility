import { useMatch } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../hooks";
import { setSolutions } from "../reducers/solutionsReducer";
import { useEffect } from "react";
import Map from "./Map";
import ReactMarkdown from "react-markdown";

const Solution = () => {
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

	const match = useMatch("solutions/:id");
	const solution = match
		? solutions.find((solution) => solution.id === match.params.id)
		: null;

	return (
		<div>
			{solution ? (
				<div className="solution">
					<h1>{solution.name}</h1>
					<p className="solution__description">{solution.description}</p>
					<div className="solution__image-and-map">
						<img
							className="solution__image"
							src={solution.img}
							alt={solution.name}
						/>
						<Map plusCode={solution.googlePlusCode} />
					</div>
					{solution.details ? (
						<ReactMarkdown className="solution__details">
							{solution.details}
						</ReactMarkdown>
					) : null}
				</div>
			) : (
				<div>Solution not found</div>
			)}
		</div>
	);
};

export default Solution;
