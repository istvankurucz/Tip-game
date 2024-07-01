import PropTypes from "prop-types";
import Overlay from "../../layout/Overlay/Overlay";
import Modal from "../../layout/Modal/Modal";
import Button from "../Button/Button";
import Goal from "../Goal/Goal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding, faCity, faUsers } from "@fortawesome/free-solid-svg-icons";
import useGoalScorers from "../../../hooks/useGoalScorers";
import "./MatchInfo.css";
import { useMemo } from "react";

function MatchInfo({ show, setShow, data }) {
	const goalScorersIds = useMemo(() => {
		if (data && data?.goals) {
			const scorerIds = data.goals.map((goal) => goal.goalGetterID);
			return scorerIds.filter((scorerId) => scorerId !== 0);
		}
		return [];
	}, [data]);
	const goalScorers = useGoalScorers(goalScorersIds);

	const modalTitle = (
		<span className="matchInfo__modal__title">
			Match info
			<div className="matchInfo__title__flags">
				<img src={data?.teams.team1.iconUrl} className="matchInfo__title__flag" />
				<img src={data?.teams.team2.iconUrl} className="matchInfo__title__flag" />
			</div>
		</span>
	);

	return (
		<Overlay show={show} className="matchInfo">
			<Modal title={modalTitle} setShow={setShow}>
				<Modal.Body>
					<h3 className="matchInfo__title">Location</h3>
					<ul className="matchInfo__list matchInfo__list--location">
						<li className="matchInfo__list__item">
							<span className="matchInfo__location__icon">
								<FontAwesomeIcon icon={faCity} />
							</span>
							City: <span className="matchInfo__location__value">{data?.location.city}</span>
						</li>
						<li className="matchInfo__list__item">
							<span className="matchInfo__location__icon">
								<FontAwesomeIcon icon={faBuilding} />
							</span>
							Stadium:{" "}
							<span className="matchInfo__location__value">{data?.location.stadium}</span>
						</li>
						<li className="matchInfo__list__item">
							<span className="matchInfo__location__icon">
								<FontAwesomeIcon icon={faUsers} />
							</span>
							Viewers: <span className="matchInfo__location__value">{data?.viewers}</span>
						</li>
					</ul>

					<h3 className="matchInfo__title">Goals</h3>
					<ul className="matchInfo__list matchInfo__list--goals">
						{data?.goals.map((goal, i) => {
							let scorerTeam = "";
							if (i === 0)
								scorerTeam = goal.scoreTeam1 > goal.scoreTeam2 ? "team1" : "team2";
							else
								scorerTeam =
									goal.scoreTeam1 > data?.goals[i - 1].scoreTeam1 ? "team1" : "team2";

							return (
								<li key={goal.goalID} className="matchInfo__list__item">
									<Goal
										scorerTeam={scorerTeam}
										score={{ team1: goal.scoreTeam1, team2: goal.scoreTeam2 }}
										minute={goal.matchMinute}
										scorerPlayer={
											goalScorers.find((scorer) => scorer.id === goal.goalGetterID)?.name
										}
										isPenalty={goal.isPenalty}
										isOwnGoal={goal.isOwnGoal}
									/>
								</li>
							);
						})}
					</ul>
				</Modal.Body>

				<Modal.Footer>
					<Button variant="secondary" onClick={() => setShow(false)}>
						Close
					</Button>
				</Modal.Footer>
			</Modal>
		</Overlay>
	);
}

MatchInfo.propTypes = {
	show: PropTypes.bool.isRequired,
	setShow: PropTypes.func.isRequired,
	flags: PropTypes.object,
	data: PropTypes.object,
};

export default MatchInfo;
