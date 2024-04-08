import { useEffect } from "react";
import { setSolutions } from "../reducers/solutionsReducer";
import { useAppSelector, useAppDispatch } from "../hooks";

const Solutions = () => {
	const dispatch = useAppDispatch();
	const solutions = useAppSelector((state) => state.solutions);

	useEffect(() => {
		const fetchData = async () => {
			try {
				await dispatch(setSolutions());
			} catch (error) {
				console.error("Error fetching slutions:", error);
			}
		};
		fetchData();
	}, [dispatch]);

	return (
		<div className="presentation">
			<h1 className="presentation__title">Solutions de mobilité</h1>
			<p className="presentation__description">
				Catalogue de solutions innovantes et durables
			</p>
			<div className="solution-container">
				{solutions.map((solution) => (
					<div className="solution-card" key={solution.id}>
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
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Solutions;
