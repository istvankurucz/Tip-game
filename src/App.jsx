import { Route, Routes } from "react-router-dom";
import Header from "./components/layout/Header/Header";
import Home from "./pages/Home/Home";
import Footer from "./components/layout/Footer/Footer";
import "./App.css";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import useAuth from "./hooks/useAuth";
import Overview from "./pages/Overview/Overview";

function App() {
	// Hook to handle authentication
	useAuth();

	// Function that return the component with Header and Footer
	function addHeaderAndFooterToComponent(component) {
		return (
			<>
				<Header />
				{component}
				<Footer />
			</>
		);
	}

	return (
		<div className="app">
			<Routes>
				<Route path="/signin" element={<SignIn />} />
				<Route path="/signup" element={<SignUp />} />

				<Route path="/overview" element={addHeaderAndFooterToComponent(<Overview />)} />
				<Route path="/" element={addHeaderAndFooterToComponent(<Home />)} />

				<Route path="*" element={<h1>404, Page not found.</h1>} />
			</Routes>
		</div>
	);
}

export default App;
