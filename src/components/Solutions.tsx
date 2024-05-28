import { Link } from "react-router-dom";
import { Solution } from "../types";
import { Tooltip } from "react-tooltip";
import { useState } from "react";
import Filter from "./Filter";

interface Props {
	solutions: Solution[];
}

const Solutions: React.FC<Props> = ({ solutions }) => {
	//const reversedSolutions = [...solutions].reverse();
	const [filters, setFilters] = useState({ category: "", region: "" });

	const handleFilterChange = (newFilters: {
		category: string;
		region: string;
	}) => {
		setFilters(newFilters);
	};

	const filteredSolutions = solutions
		.filter(
			(solution) =>
				(filters.category === "" || solution.category === filters.category) &&
				(filters.region === "" || solution.region === filters.region)
		)
		.reverse();

	const categories = Array.from(
		new Set(solutions.map((solution) => solution.category))
	);
	const regions = Array.from(
		new Set(solutions.map((solution) => solution.region))
	);

	return (
		<div className="presentation">
			<h1 className="presentation__title">Solutions de mobilité</h1>
			<p className="presentation__description">
				Catalogue de solutions innovantes et durables
			</p>
			<Filter
				categories={categories}
				regions={regions}
				onFilterChange={handleFilterChange}
			/>
			<div className="solution-container">
				{filteredSolutions.map((solution) => (
					<div className="solution-card" key={solution.id}>
						<Link
							to={`/solutions/${solution.id}`}
							className="solution-card__link"
						>
							<img
								className="solution-card__image"
								src={solution.img}
								alt={solution.name}
							/>
							<div className="solution-card__content">
								<div className="solution-card__content__category">
									{solution.category}
								</div>
								<div className="solution-card__content__title">
									{solution.name}
								</div>
								<p className="solution-card__content__description">
									{solution.description}
								</p>

								{solution.region !== "autre" ? (
									<img
										className="solution-card__badge"
										src={`/${solution.region}_badge.svg`}
										alt={solution.name}
										data-tooltip-id="my-tooltip"
										data-tooltip-content={solution.region}
									/>
								) : null}
							</div>
						</Link>
					</div>
				))}
			</div>
			<Tooltip id="my-tooltip" />
		</div>
	);
};

export default Solutions;
