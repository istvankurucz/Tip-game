import PropTypes from "prop-types";
import Input from "../../form/Input/Input";
import { useState } from "react";
import calcPoints from "../../../utils/match/calcPoints";
import Button from "../Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faInfo, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import MatchInfo from "./MatchInfo";
import Dropdown from "../Dropdown/Dropdown";
import "./Match.css";

function Match({ id, team1, team2, time, tip, result, finished, onInfoClick, className }) {
	const [team1Tip, setTeam1Tip] = useState(tip?.team1Score ?? "");
	const [team2Tip, setTeam2Tip] = useState(tip?.team2Score ?? "");
	const [showGroups, setShowGroups] = useState(false);

	// Check if the match has started
	const date = new Date(time);
	const now = new Date();
	const matchStarted = now >= date;

	// Check if the match is live
	const isLiveMatch = matchStarted && !finished;

	// Get points based on the tip and the result
	const { points, colorVariant } = result ? calcPoints(tip, result) : "?";

	// Function to close the dropdown
	function hideDropdown() {
		setTimeout(() => {
			setShowGroups(false);
		}, 100);
	}

	return (
		<div className={`match${className ? ` ${className}` : ""}`}>
			<Button
				title="Match info"
				variant="secondary"
				icon
				rounded
				onClick={onInfoClick}
				className="match__info__button"
				tabIndex={-1}
			>
				<FontAwesomeIcon icon={faInfo} />
			</Button>

			<div className="match__time">
				{date.toLocaleDateString()} - {date.toLocaleTimeString().substring(0, 5)}
			</div>

			<div className="match__teams">
				<div className="match__team match__team--1">
					<span className="match__team__name">{team1?.name}</span>
					<span className="match__team__short">{team1?.shortName}</span>
					<img src={team1?.iconUrl} alt={team1?.name} className="match__team__icon" />
				</div>

				{!matchStarted ? (
					<div className="match__score match__score--tip">
						<Input
							type="number"
							min={0}
							max={99}
							id={`${id}-team1-score`}
							className="match__score__input"
							value={team1Tip}
							onChange={(e) => setTeam1Tip(e.target.value)}
						/>{" "}
						-
						<Input
							type="number"
							min={0}
							max={99}
							id={`${id}-team2-score`}
							className="match__score__input"
							value={team2Tip}
							onChange={(e) => setTeam2Tip(e.target.value)}
						/>
					</div>
				) : (
					<div
						title={isLiveMatch ? "Live result" : "Final result"}
						className="match__score match__score--result"
					>
						{isLiveMatch && <span className="match__score__result__live"></span>}
						{result != null ? (
							<>
								{result.team1Score}-{result.team2Score}
							</>
						) : (
							"?"
						)}
					</div>
				)}

				<div className="match__team match__team--2">
					<span className="match__team__name">{team2?.name}</span>
					<span className="match__team__short">{team2?.shortName}</span>
					<img src={team2?.iconUrl} alt={team2?.name} className="match__team__icon" />
				</div>
			</div>

			{matchStarted && (
				<div className="match__points">
					<span title="Your tip" className="match__points__tip">
						{tip != null ? (
							<>
								{tip?.team1Score}-{tip?.team2Score}
							</>
						) : (
							"No tip"
						)}
					</span>

					<span
						className={`match__points__points${
							result == null ? "" : ` match__points__points--${colorVariant}`
						}`}
					>
						({points} point{points > 1 && "s"})
					</span>
				</div>
			)}

			{matchStarted && (
				<div className="match__othersTip">
					<Button
						title="Other's tips"
						rounded
						className="match__othersTip__button"
						tabIndex={-1}
						onFocus={() => setShowGroups(true)}
						onBlur={hideDropdown}
					>
						<FontAwesomeIcon icon={faPenToSquare} />
						<FontAwesomeIcon icon={faAngleDown} />
					</Button>

					<Dropdown show={showGroups} className="match__othersTip__groups">
						<Dropdown.Item>Group 1</Dropdown.Item>
						<Dropdown.Item>Group 2</Dropdown.Item>
						<Dropdown.Item>Group 3</Dropdown.Item>
					</Dropdown>
				</div>
			)}
		</div>
	);
}

Match.propTypes = {
	id: PropTypes.number,
	team1: PropTypes.object,
	team2: PropTypes.object,
	time: PropTypes.string,
	tip: PropTypes.object,
	result: PropTypes.object,
	finished: PropTypes.bool,
	onInfoClick: PropTypes.func,
	className: PropTypes.string,
};

Match.Info = MatchInfo;

export default Match;
