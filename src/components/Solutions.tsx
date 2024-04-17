import { Link } from "react-router-dom";
import { Solution } from "../types";
import { Tooltip } from "react-tooltip";

interface Props {
	solutions: Solution[];
}

const Solutions: React.FC<Props> = ({ solutions }) => {
	return (
		<div className="presentation">
			<h1 className="presentation__title">Solutions de mobilité</h1>
			<p className="presentation__description">
				Catalogue de solutions innovantes et durables
			</p>
			<div className="solution-container">
				{solutions.map((solution) => (
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
								<div className="solution-card__content__title">
									{solution.name}
								</div>
								<p className="solution-card__content__description">
									{solution.description}
								</p>
								<div className="solution-card__content__category">
									{solution.category}
								</div>
								{solution.region !== "autre" ? (
									<img
										className="solution-card__badge"
										src={`/${solution.region}_badge.svg`}
										alt={solution.name}
										data-tooltip-id="my-tooltip"
										data-tooltip-content={solution.region} // Set the tooltip text here
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
