import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import SolutionContact from "./SolutionContact";
import { Solution as SolutionType } from "../types";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
	solution: SolutionType;
}

const SolutionForm: React.FC<Props> = ({ solution }) => {
	const [title, setTitle] = useState(solution.name);
	const navigate = useNavigate();

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setTitle(e.target.value);
	};

	const handleValidateChange = () => {
		// Logic to save the changes (e.g., API call)
		// After saving, navigate back to the Solution component
		navigate(`/solutions/${solution.id}`);
	};

	return (
		<div>
			<div className="solution">
				<div className="solution__title">
					<textarea
						value={title}
						onChange={handleTitleChange}
						placeholder={solution.name}
					/>
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
				<button onClick={handleValidateChange}>Validate Change</button>
			</div>
		</div>
	);
};

export default SolutionForm;
