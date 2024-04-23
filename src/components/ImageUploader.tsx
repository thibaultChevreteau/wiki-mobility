import { IKContext, IKUpload } from "imagekitio-react";
import { useAuth0 } from "@auth0/auth0-react";
import { useRef, useState } from "react";
import { NewSolution, Solution as SolutionType } from "../types";

interface Props {
	solution: SolutionType | NewSolution;
	onImageUpload: (image: {
		url: string;
		id: string;
		modified: boolean;
	}) => void;
}

const ImageUploader: React.FC<Props> = ({ solution, onImageUpload }) => {
	const folder =
		process.env.NODE_ENV === "production"
			? "/Mobility_Solutions"
			: "/Mobility_Solutions_Dev";
	const ikUploadRefTest = useRef<HTMLInputElement>(null);
	const { getAccessTokenSilently } = useAuth0();
	const [image, setImage] = useState<{
		url: string;
		id: string;
		modified: boolean;
	}>({
		url: solution.img,
		id: solution.imgId,
		modified: false,
	});
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

			const response = await fetch("/api/imagekit", {
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

	const onUploadProgress = (progress: unknown) => {
		console.log(progress);
	};

	const onUploadStart = () => {
		console.log("Upload started");
	};

	const onSuccess = async (res: unknown) => {
		const uploadedImageUrl = (res as { url: string }).url;
		const uploadedImageId = (res as { fileId: string }).fileId;
		setImage({ url: uploadedImageUrl, id: uploadedImageId, modified: true });
		onImageUpload({
			url: uploadedImageUrl,
			id: uploadedImageId,
			modified: true,
		});
	};

	return (
		<div className="imageUploader__container">
			<IKContext
				urlEndpoint={urlEndpoint}
				publicKey={publicKey}
				authenticator={authenticator}
			>
				<IKUpload
					fileName="solution_image"
					folder={folder}
					validateFile={(file) => file.size < 1000000}
					onError={onError}
					onSuccess={onSuccess}
					onUploadProgress={onUploadProgress}
					onUploadStart={onUploadStart}
					style={{ display: "none" }}
					ref={ikUploadRefTest}
				/>
				{ikUploadRefTest && (
					<div
						className="imageUploader__modify"
						onClick={() => ikUploadRefTest.current?.click()}
					>
						<img src="/camera-add.svg" alt="camera logo to add an image" />
					</div>
				)}
			</IKContext>
			<img className="imageUploader__image" src={image.url} alt="" />
		</div>
	);
};

export default ImageUploader;
