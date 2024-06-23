import { Route, Routes } from "react-router-dom";
import Header from "./components/layout/Header/Header";
import Home from "./pages/Home/Home";
import Footer from "./components/layout/Footer/Footer";
import "./App.css";

function App() {
	return (
		<div className="app">
			<Header />

			<Routes>
				<Route path="/" element={<Home />} />
			</Routes>

			<Footer />
		</div>
	);
}

export default App;
