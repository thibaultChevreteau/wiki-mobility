import { Auth0Provider, AppState } from "@auth0/auth0-react";
import React, { PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";

interface Auth0ProviderWithNavigateProps {
	children: React.ReactNode;
}

export const Auth0ProviderWithNavigate = ({
	children,
}: PropsWithChildren<Auth0ProviderWithNavigateProps>): JSX.Element | null => {
	const navigate = useNavigate();

	const domain = "dev-d1ata42jo6pflamw.eu.auth0.com";
	const clientId = "n1fpQT6YXiFy4CcJdXTVXs3KZTnKlApj";
	const redirectUri = window.location.origin;

	const onRedirectCallback = (appState?: AppState) => {
		navigate(appState?.returnTo || window.location.pathname);
	};

	if (!(domain && clientId && redirectUri)) {
		return null;
	}

	return (
		<Auth0Provider
			domain={domain}
			clientId={clientId}
			authorizationParams={{
				redirect_uri: redirectUri,
				audience: "https://editorial.com",
				scope: "write:solutions",
			}}
			onRedirectCallback={onRedirectCallback}
		>
			{children}
		</Auth0Provider>
	);
};
