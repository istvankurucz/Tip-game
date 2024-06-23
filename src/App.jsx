import "./App.css";
import Checkbox from "./components/form/Checkbox/Checkbox";
import Header from "./components/layout/Header/Header";

function App() {
	return (
		<div className="app">
			{/* <Header /> */}
			<h1>Tip game</h1>

			<Checkbox id="cbox1" label="Checkbox 1" />
		</div>
	);
}

export default App;
