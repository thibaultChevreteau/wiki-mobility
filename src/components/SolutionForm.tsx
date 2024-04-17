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
	const [name, setName] = useState(solution.name);
	const [description, setDescription] = useState(solution.description);
	const [region, setRegion] = useState(solution.region);
	const [authorizedUser, setAuthorizedUser] = useState(true);
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const { getAccessTokenSilently, isAuthenticated, loginWithRedirect, logout } =
		useAuth0();

	const parseJwt = (token: string) => {
		try {
			return JSON.parse(atob(token.split(".")[1]));
		} catch (e) {
			return null;
		}
	};

	useEffect(() => {
		const checkScope = async () => {
			if (isAuthenticated) {
				try {
					const accessToken = await getAccessTokenSilently();
					const decodedToken = parseJwt(accessToken);
					if (
						decodedToken &&
						decodedToken.scope &&
						decodedToken.scope.includes("write:solutions")
					) {
						setAuthorizedUser(true);
					} else {
						setAuthorizedUser(false);
					}
				} catch (error) {
					console.error("Error checking scope:", error);
				}
			} else {
				setAuthorizedUser(false);
			}
		};
		checkScope();

		window.scrollTo(0, 0);
	}, [getAccessTokenSilently, isAuthenticated]);

	const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);
	};

	const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setDescription(e.target.value);
	};

	const handleRegionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setRegion(e.target.value);
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

	const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		logout({ logoutParams: { returnTo: window.location.origin } });
	};

	const handleValidateChange = async () => {
		try {
			const accessToken = await getAccessTokenSilently({
				authorizationParams: {
					audience: `https://editorial.com`,
					scope: "write:solutions",
				},
			});
			await dispatch(
				updateSolution(
					{ ...solution, name: name, description: description, region: region },
					accessToken
				)
			);
			navigate(`/solutions/${solution.id}`);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div>
			<div className="solutionForm">
				{!authorizedUser && !isAuthenticated && (
					<div className="solutionForm__notification">
						Attention, vous n'êtes pas connecté.{" "}
						<button onClick={handleLogin}>Connectez-vous</button> pour pouvoir
						valider vos modifications.
					</div>
				)}
				{!authorizedUser && isAuthenticated && (
					<div className="solutionForm__notification">
						Attention, vous êtes connecté mais vous n'avez pas la permission
						requise pour valider vos modifications.{" "}
						<button onClick={handleLogout}>Déconnexion</button>
					</div>
				)}
				{authorizedUser && isAuthenticated && (
					<div className="solutionForm__authenticated">
						Vous êtes connecté. Vous pouvez valider vos modifications avec la
						coche. Vous pouvez également vous&nbsp;
						<button onClick={handleLogout}> déconnecter</button>.
					</div>
				)}
				<div className="solutionForm__modify" onClick={handleValidateChange}>
					<img src="/tick.svg" alt="modifier la solution" />
				</div>
				<div className="solutionForm__title">
					<h1>
						<input
							type="text"
							value={name}
							onChange={handleTitleChange}
							placeholder={solution.name}
							required
						/>
					</h1>
				</div>
				<input
					type="radio"
					id="occitanie"
					name="region"
					value="occitanie"
					checked={region === "occitanie"}
					onChange={handleRegionChange}
				/>
				<label htmlFor="occitanie">
					<img src="/occitanie_badge.svg" alt="Occitanie" />
				</label>

				<input
					type="radio"
					id="nouvelle-aquitaine"
					name="region"
					value="nouvelle-aquitaine"
					checked={region === "nouvelle-aquitaine"}
					onChange={handleRegionChange}
				/>
				<label htmlFor="nouvelle-aquitaine">
					<img src="/nouvelle-aquitaine_badge.svg" alt="Nouvelle-Aquitaine" />
				</label>

				{/* Render text input for Autre */}
				<input
					type="radio"
					id="autre"
					name="region"
					value="autre"
					checked={region === "autre"}
					onChange={handleRegionChange}
				/>
				<label htmlFor="autre">Autre Région</label>

				{/* {solution.region !== "autre" ? (
					<img src={`/${solution.region}_badge.svg`} alt={solution.name} />
				) : null} */}

				<p className="solutionForm__description">
					<input
						type="text"
						value={description}
						onChange={handleDescriptionChange}
						placeholder={solution.description}
						required
					/>
				</p>
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
			</div>
		</div>
	);
};

export default SolutionForm;
