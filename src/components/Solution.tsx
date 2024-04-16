import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import SolutionContact from "./SolutionContact";
import { Solution as SolutionType } from "../types";
import { useEffect } from "react";

interface Props {
	solution: SolutionType;
}

const Solution: React.FC<Props> = ({ solution }) => {
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<div>
			<div className="solution">
				<Link
					to={`/solutions/${solution.id}/edit`}
					className="solution-card__link"
				>
					Edit
				</Link>
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
		</div>
	);
};

export default Solution;
