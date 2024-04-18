import { IKContext, IKUpload } from "imagekitio-react";
import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";
import { Solution as SolutionType } from "../types";

interface Props {
	solution: SolutionType;
	onImageUpload: (image: string) => void;
}

const ImageUploader: React.FC<Props> = ({ solution, onImageUpload }) => {
	const { getAccessTokenSilently } = useAuth0();
	const [image, setImage] = useState(solution.img);

	const urlEndpoint = "https://ik.imagekit.io/vndkxhhge";
	const publicKey = "public_051SlpoQfkOCqK4JT5TL6dOyFQQ=";
	const authenticator = async () => {
		try {
			const accessToken = await getAccessTokenSilently({
				authorizationParams: {
					audience: `https://editorial.com`,
					scope: "write:solutions",
				},
			});

			const response = await fetch("http://localhost:3000/imagekit", {
				method: "GET",
				headers: {
					Authorization: `Bearer ${accessToken}`,
					"Content-Type": "application/json",
				},
			});

			if (!response.ok) {
				const errorText = await response.text();
				throw new Error(
					`Request failed with status ${response.status}: ${errorText}`
				);
			}

			const data = await response.json();
			const { signature, expire, token } = data;
			return { signature, expire, token };
		} catch (error) {
			throw new Error(
				`Authentication request failed: ${(error as Error).message}`
			);
		}
	};

	const onError = (err: unknown) => {
		console.log("Error", err);
	};

	const onSuccess = (res: unknown) => {
		const uploadedImageUrl = (res as { url: string }).url;
		setImage(uploadedImageUrl);
		onImageUpload(uploadedImageUrl);
	};

	return (
		<div>
			<IKContext
				urlEndpoint={urlEndpoint}
				publicKey={publicKey}
				authenticator={authenticator}
			>
				<p>Upload an image</p>
				<IKUpload
					fileName="solution_image"
					folder={"/Mobility_Solutions"}
					validateFile={(file) => file.size < 1000000}
					onError={onError}
					onSuccess={onSuccess}
				/>
			</IKContext>
			<img className="solutionForm__image" src={image} alt="" />
		</div>
	);
};

export default ImageUploader;
