import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import SolutionContact from "./SolutionContact";
import { Solution as SolutionType } from "../types";
import { useNavigate } from "react-router-dom";
import { updateSolution } from "../reducers/solutionsReducer";
import { useAppDispatch } from "../hooks";
import { useAuth0 } from "@auth0/auth0-react";

interface Props {
	solution: SolutionType;
}

const SolutionForm: React.FC<Props> = ({ solution }) => {
	const [title, setTitle] = useState(solution.name);
	const [initialCheckCompleted, setInitialCheckCompleted] = useState(false);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { getAccessTokenSilently, isAuthenticated, loginWithRedirect } =
		useAuth0();

	useEffect(() => {
		window.scrollTo(0, 0);
		setInitialCheckCompleted(true);
	}, []);

	const handleTitleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setTitle(e.target.value);
	};

	const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		await loginWithRedirect({
			appState: {
				returnTo: `/solutions/${solution.id}/edit`,
			},
			authorizationParams: {
				prompt: "login",
			},
		});
	};

	const handleValidateChange = async () => {
		try {
			const accessToken = await getAccessTokenSilently({
				authorizationParams: {
					audience: `https://editorial.com`,
					scope: "write:solutions",
				},
			});
			await dispatch(updateSolution({ ...solution, name: title }, accessToken));
			navigate(`/solutions/${solution.id}`);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="solutionForm">
			{initialCheckCompleted && !isAuthenticated && (
				<div className="solutionForm__notification">
					Attention, vous n'êtes pas connecté.{" "}
					<button onClick={handleLogin}>Connectez-vous</button> pour pouvoir
					valider vos modifications.
				</div>
			)}
			<div className="solutionForm__title">
				<textarea
					value={title}
					onChange={handleTitleChange}
					placeholder={solution.name}
				/>
				{solution.region !== "autre" ? (
					<img src={`/${solution.region}_badge.svg`} alt={solution.name} />
				) : null}
			</div>
			<p className="solutionForm__description">{solution.description}</p>
			<div className="solutionForm__image-and-map">
				<img
					className="solutionForm__image"
					src={solution.img}
					alt={solution.name}
				/>
				<SolutionContact solution={solution} />
			</div>
			{solution.details ? (
				<ReactMarkdown className="solutionForm__details">
					{solution.details}
				</ReactMarkdown>
			) : null}
			<button onClick={handleValidateChange}>Validate Change</button>
		</div>
	);
};

export default SolutionForm;
