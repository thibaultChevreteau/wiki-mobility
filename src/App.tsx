import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Solutions from "./components/Solutions";
import Solution from "./components/Solution";

const App = () => {
	return (
		<div>
			<NavBar />
			<Routes>
				<Route path="/" element={<Solutions />} />
				<Route path="/solutions/:id" element={<Solution />} />
			</Routes>
		</div>
	);
};

export default App;
