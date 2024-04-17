import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.tsx";
import store from "./store";
import { BrowserRouter as Router } from "react-router-dom";
import "./styles/main.scss";
import "@fontsource/ubuntu";
import { Auth0ProviderWithNavigate } from "./auth0-provider-with-navigate.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<Provider store={store}>
		<Router>
			<Auth0ProviderWithNavigate>
				<App />
			</Auth0ProviderWithNavigate>
		</Router>
	</Provider>
);
