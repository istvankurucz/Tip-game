import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import useAuth from "./hooks/useAuth";
import Overview from "./pages/Overview/Overview";
import Feedback from "./components/ui/Feedback/Feedback";
import Tournaments from "./pages/Tournaments/Tournaments";
import "./App.css";
import MyTips from "./pages/MyTips/MyTips";

function App() {
	// Hook to handle authentication
	useAuth();

	return (
		<div className="app">
			<Feedback />

			<Routes>
				<Route path="/signin" element={<SignIn />} />
				<Route path="/signup" element={<SignUp />} />

				<Route path="/overview" element={<Overview />} />
				<Route path="/mytips" element={<MyTips />} />
				<Route path="/tournaments" element={<Tournaments />} />
				<Route path="/" element={<Home />} />

				<Route path="*" element={<h1>404, Page not found.</h1>} />
			</Routes>
		</div>
	);
}

export default App;
