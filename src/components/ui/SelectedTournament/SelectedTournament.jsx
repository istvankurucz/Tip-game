import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import useActiveTournament from "../../../hooks/useActiveTournament";
import "./SelectedTournament.css";

function SelectedTournament({ className }) {
	const tournament = useActiveTournament();

	return (
		<div className={`selectedTournament${className ? ` ${className}` : ""}`}>
			<p className="selectedTournament__p">
				Tournament: <strong className="selectedTournament__name">{tournament?.name}</strong>
			</p>
			<Link to="/tournaments" className="selectedTournament__change">
				Change
			</Link>
		</div>
	);
}

SelectedTournament.propTypes = {
	className: PropTypes.string,
};

export default SelectedTournament;
