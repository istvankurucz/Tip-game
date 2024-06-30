import PropTypes from "prop-types";
import "./Goal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFutbol } from "@fortawesome/free-solid-svg-icons";

function Goal({ scorerTeam, score, minute, scorerPlayer, isPenalty, isOwnGoal }) {
	return (
		<div className={`goal goal--${scorerTeam}`}>
			<span className="goal__minute">{minute}&apos;</span>

			<div className="goal__score">
				<FontAwesomeIcon
					icon={faFutbol}
					className={`goal__score__icon${isOwnGoal ? " goal__score__icon--ownGoal" : ""}`}
				/>
				{score.team1}-{score.team2}
			</div>

			<span className="goal__scorer">{scorerPlayer}</span>

			<span className="goal__info">{isPenalty ? "(Penalty)" : isOwnGoal && "(Own goal)"}</span>
		</div>
	);
}

Goal.propTypes = {
	scorerTeam: PropTypes.oneOf(["team1", "team2"]),
	score: PropTypes.object,
	minute: PropTypes.number,
	scorerPlayer: PropTypes.string,
	isPenalty: PropTypes.bool,
	isOwnGoal: PropTypes.bool,
};

export default Goal;
