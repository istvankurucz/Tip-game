import { Route, Routes } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import Home from "./pages/Home/Home";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Overview from "./pages/Overview/Overview";
import Feedback from "./components/ui/Feedback/Feedback";
import Tournaments from "./pages/Tournaments/Tournaments";
import MyTips from "./pages/MyTips/MyTips";
import MyTeams from "./pages/MyTeams/MyTeams";
import TeamProvider from "./contexts/TeamContext";
import Team from "./pages/Team/Team";
import "./App.css";

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
				<Route path="/myteams" element={<MyTeams />} />
				<Route
					path="/teams/:teamId"
					element={
						<TeamProvider>
							<Team />
						</TeamProvider>
					}
				>
					<Route index path="ranking" element={<Team.Ranking />} />
					<Route path="rules" element={<Team.Rules />} />
					<Route path="settings" element={<Team.Settings />} />
				</Route>

				<Route path="/" element={<Home />} />

				<Route path="*" element={<h1>404, Page not found.</h1>} />
			</Routes>
		</div>
	);
}

export default App;
