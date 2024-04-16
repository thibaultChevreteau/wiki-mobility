import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import solutionsService from "../services/solution";

const Profile = () => {
	const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
	//const [userMetadata, setUserMetadata] = useState(null);

	useEffect(() => {
		const getUserMetadata = async () => {
			//const domain = "dev-d1ata42jo6pflamw.eu.auth0.com";

			try {
				const accessToken = await getAccessTokenSilently({
					authorizationParams: {
						audience: `https://editorial.com`,
						scope: "write:solutions",
					},
				});

				const message = await solutionsService.getPrivate(accessToken);

				console.log(message);
			} catch (e) {
				console.log(e.message);
			}
		};

		getUserMetadata();
	}, [getAccessTokenSilently, user?.sub]);

	return (
		isAuthenticated && (
			<div>
				<img src={user.picture} alt={user.name} />
				<h2>{user.name}</h2>
				<p>{user.email}</p>
			</div>
		)
	);
};

export default Profile;
