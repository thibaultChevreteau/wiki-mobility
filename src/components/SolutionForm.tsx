import React, { useState, useEffect } from "react";
import {
	Category,
	NewSolution,
	Region,
	Solution as SolutionType,
} from "../types";
import { useNavigate } from "react-router-dom";
import { updateSolution, addNewSolution } from "../reducers/solutionsReducer";
import { useAppDispatch } from "../hooks";
import { useAuth0 } from "@auth0/auth0-react";
import SolutionContactForm from "./SolutionContactForm";
import ImageUploader from "./ImageUploader";

function countOccurrences(string: string, substring: string) {
	// Escape special characters in the substring
	const escapedSubstring = substring.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&");

	// Create a regular expression to match the substring globally
	const regex = new RegExp(escapedSubstring, "g");

	// Use match() to get an array of all occurrences of the substring
	const matches = string.match(regex);

	// Return the number of occurrences
	return matches ? matches.length : 0;
}

interface Props {
	solution: SolutionType | NewSolution;
}

const SolutionForm: React.FC<Props> = ({ solution }) => {
	const solutionDetailsPlaceHolder =
		"Utilisez la syntaxe MarkDown pour mettre en forme votre texte\n\n#Titre\nVotre texte de description\n\n##Sous-titre\nExemple de liste :\n* Item 1\n* Item 2\n* Item 3\n\n##Exemple de lien url :\n[Texte de mon lien](https://monlien.fr)";
	const [name, setName] = useState(solution.name);
	const [description, setDescription] = useState(solution.description);
	const [category, setCategory] = useState(solution.category);
	const [region, setRegion] = useState(solution.region);
	const [image, setImage] = useState(solution.img);
	const [imageId, setImageId] = useState(solution.imgId);
	const [imageModified, setImageModified] = useState(false);
	const [googlePlusCode, setGooglePlusCode] = useState(solution.googlePlusCode);
	const [contact, setContact] = useState(solution.contact);
	const [website, setWebsite] = useState(solution.website);
	const [details, setDetails] = useState(solution.details);
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

	const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCategory(e.target.value as Category);
	};

	const handleRegionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setRegion(e.target.value as Region);
	};

	const handleImageUpload = (image: {
		url: string;
		id: string;
		modified: boolean;
	}) => {
		setImage(image.url);
		setImageId(image.id);
		setImageModified(image.modified);
	};

	const handleContactChange = (contact: string) => {
		setContact(contact);
	};

	const handleWebsiteChange = (website: string) => {
		setWebsite(website);
	};

	const handleGooglePlusCodeChange = (googlePlusCode: string) => {
		setGooglePlusCode(googlePlusCode);
	};

	const handleDetailsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setDetails(e.target.value);
	};

	const handleLogin = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		const redirectUrl: string =
			"id" in solution
				? `/solutions/${solution.id}/edit`
				: "/nouvelle-solution";
		await loginWithRedirect({
			appState: {
				returnTo: redirectUrl,
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

			if ("id" in solution) {
				await dispatch(
					updateSolution(
						{
							...solution,
							name: name,
							description: description,
							category: category,
							region: region,
							img: image,
							imgId: imageId,
							googlePlusCode: googlePlusCode,
							contact: contact !== "" ? contact : solution.contact,
							website: website !== "" ? website : solution.website,
							details: details !== "" ? details : solution.details,
						},
						accessToken
					)
				);
				navigate(`/solutions/${solution.id}`);
			} else {
				if (image === "/default_image.png") {
					alert("Merci d'importer une image");
				} else {
					console.log(category);

					const newSolution = {
						name: name,
						description: description,
						category: category,
						region: region,
						img: image,
						imgId: imageId,
						googlePlusCode: googlePlusCode,
						contact: contact !== "" ? contact : solution.contact,
						website: website !== "" ? website : solution.website,
						details: details !== "" ? details : solution.details,
					};
					const newSolutionWithId = await dispatch(
						addNewSolution(newSolution, accessToken)
					);
					navigate(`/solutions/${newSolutionWithId.id}`);
				}
			}

			if (imageModified) {
				await fetch(`/api/imagekit/${solution.imgId}`, {
					method: "DELETE",
					headers: {
						Authorization: "Bearer " + accessToken,
						"Content-Type": "application/json",
					},
				});
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleCancelChange = () => {
		if ("id" in solution) {
			navigate(`/solutions/${solution.id}`);
		} else {
			navigate(`/`);
		}
	};

	const newlineCount = solution.details
		? countOccurrences(solution.details, "\n")
		: countOccurrences(solutionDetailsPlaceHolder, "\n");
	const textareaStyle = {
		height: `${newlineCount * 18}px`,
	};

	const handleInput: React.FormEventHandler<HTMLTextAreaElement> = (event) => {
		const textarea = event.target as HTMLTextAreaElement;
		textarea.style.height = "";
		textarea.style.height = `${textarea.scrollHeight}px`;
		window.scrollTo(0, document.body.scrollHeight);
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
				<div className="solutionForm__cancel" onClick={handleCancelChange}>
					<img src="/cross.svg" alt="annuler les changements" />
				</div>
				<div className="solutionForm__title">
					<h1>
						<input
							type="text"
							value={name}
							onChange={handleTitleChange}
							placeholder="Nom de la solution"
							required
						/>
					</h1>
				</div>

				<div>
					<input
						type="radio"
						id="Aménagement"
						name="category"
						value="Aménagement"
						checked={category === "Aménagement"}
						onChange={handleCategoryChange}
					/>
					<label htmlFor="Aménagement">Aménagement</label>
					<input
						type="radio"
						id="Matériel"
						name="category"
						value="Matériel"
						checked={category === "Matériel"}
						onChange={handleCategoryChange}
					/>
					<label htmlFor="Matériel">Matériel</label>
					<input
						type="radio"
						id="Sensibilisation"
						name="category"
						value="Sensibilisation"
						checked={category === "Sensibilisation"}
						onChange={handleCategoryChange}
					/>
					<label htmlFor="Sensibilisation">Sensibilisation</label>
					<input
						type="radio"
						id="Autre"
						name="category"
						value="Autre"
						checked={category === "Autre"}
						onChange={handleCategoryChange}
					/>
					<label htmlFor="Autre">Autre catégorie</label>
				</div>

				<div>
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
					<input
						type="radio"
						id="autre"
						name="region"
						value="autre"
						checked={region === "autre"}
						onChange={handleRegionChange}
					/>
					<label htmlFor="autre">Autre Région</label>
				</div>

				<p className="solutionForm__description">
					<input
						type="text"
						value={description}
						onChange={handleDescriptionChange}
						placeholder="Courte description de la solution"
						required
					/>
				</p>
				<div className="solutionForm__image-and-map">
					<ImageUploader
						solution={solution}
						onImageUpload={handleImageUpload}
					/>
					<SolutionContactForm
						solution={solution}
						onContactChange={handleContactChange}
						onWebsiteChange={handleWebsiteChange}
						onGooglePlusCodeChange={handleGooglePlusCodeChange}
					/>
				</div>
				<div>
					<textarea
						className="solutionForm__details"
						value={details}
						onChange={handleDetailsChange}
						placeholder={solutionDetailsPlaceHolder}
						onInput={handleInput}
						style={textareaStyle}
					/>
				</div>
			</div>
		</div>
	);
};

export default SolutionForm;
