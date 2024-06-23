import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { StateProvider } from "./contexts/context API/StateProvider.jsx";
import reducer, { initialState } from "./contexts/context API/reducer.js";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<StateProvider initialState={initialState} reducer={reducer}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
		</StateProvider>
	</React.StrictMode>
);
