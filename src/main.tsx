import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.tsx";
import store from "./store";
import { BrowserRouter as Router } from "react-router-dom";
import "./styles/main.scss";
import "@fontsource/ubuntu";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<Provider store={store}>
		<Router>
			<Auth0Provider
				domain="dev-d1ata42jo6pflamw.eu.auth0.com"
				clientId="n1fpQT6YXiFy4CcJdXTVXs3KZTnKlApj"
				authorizationParams={{
					redirect_uri: window.location.origin,
					audience: "https://editorial.com",
					scope: "write:solutions",
				}}
			>
				<App />
			</Auth0Provider>
		</Router>
	</Provider>
);
