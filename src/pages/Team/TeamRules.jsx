import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Checkbox from "../../components/form/Checkbox/Checkbox";
import Input from "../../components/form/Input/Input";
import Button from "../../components/ui/Button/Button";
import Subtitle from "../../components/ui/Subtitle/Subtitle";
import "./TeamRules.css";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useTeamContext } from "../../contexts/TeamContext";
import { useRef, useState } from "react";
import { useStateValue } from "../../contexts/context API/StateProvider";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import TeamAdminAlert from "../../components/ui/Alert/TeamAdminAlert/TeamAdminAlert";

function TeamRules() {
	const [, dispatch] = useStateValue();
	const { team, isAdmin } = useTeamContext();

	// Refs for the inputs
	const resultPointsRef = useRef();
	const exactResultPointsRef = useRef();
	const nothingPointsRef = useRef();
	const noTipPointsRef = useRef();
	const [hasGoalDifference, setHasGoalDifference] = useState(false);
	const goalDifferencePointsRef = useRef();

	// Function to collect the values from the inputs
	function getDataFromInputs() {
		return {
			result: resultPointsRef.current.valueAsNumber,
			exactResult: exactResultPointsRef.current.valueAsNumber,
			nothing: nothingPointsRef.current.valueAsNumber,
			noTip: noTipPointsRef.current.valueAsNumber,
			goalDifference:
				goalDifferencePointsRef.current == null
					? null
					: goalDifferencePointsRef.current.valueAsNumber,
		};
	}

	// Function to validate the data coming from the inputs
	function checkPointValues(values) {
		if (isNaN(values.result)) {
			return { ok: false, message: "Please fill the result input." };
		}
		if (isNaN(values.exactResult)) {
			return { ok: false, message: "Please fill the exact result input." };
		}
		if (isNaN(values.nothing)) {
			return { ok: false, message: "Please fill the nothing input." };
		}
		if (isNaN(values.noTip)) {
			return { ok: false, message: "Please fill the no tip input." };
		}

		if (values.goalDifference != null) {
			if (isNaN(values.goalDifference)) {
				return { ok: false, message: "Please fill the goal difference input." };
			}
		}

		return { ok: true, message: "" };
	}

	// Function to save the changes in the points
	async function savePoints() {
		// 1. Get the data from the inputs
		const values = getDataFromInputs();

		// 2. Check the values
		const { ok, message } = checkPointValues(values);
		if (!ok) {
			dispatch({
				type: "SET_FEEDBACK",
				feedback: {
					show: true,
					type: "error",
					message,
					details: "",
				},
			});
			return;
		}

		// 3. Update the rules in the DB
		try {
			const teamRef = doc(db, "teams", team.id);
			await updateDoc(teamRef, {
				rules: {
					result: { points: values.result, colorVariant: "warning" },
					exactResult: { points: values.exactResult, colorVariant: "success" },
					nothing: { points: values.nothing, colorVariant: "danger" },
					noTip: { points: values.noTip, colorVariant: "danger" },
					goalDifference: {
						points: values.goalDifference != null ? values.goalDifference : values.result,
						colorVariant: "warning",
					},
				},
			});

			dispatch({
				type: "SET_FEEDBACK",
				feedback: {
					show: true,
					type: "success",
					message: "Points saved.",
					details: "",
				},
			});
		} catch (e) {
			console.log("Error updating the rules in the DB.", e);
		}
	}

	// Return an alert if the user is not the admin of the team
	if (!isAdmin) {
		return <TeamAdminAlert />;
	}

	return (
		<div className="teamRules">
			<Subtitle>Basic rules</Subtitle>

			<section className="teamRules__section teamRules__section--basic">
				<div className="teamRules__section__inputs">
					<div className="teamRules__row">
						<span className="teamRules__row__text">Result only (1x2):</span>
						<Input
							type="number"
							id="teamRulesResult"
							placeholder="1"
							className="teamRules__row__input"
							defaultValue={team?.rules.result.points}
							ref={resultPointsRef}
						/>
					</div>
					<div className="teamRules__row">
						<span className="teamRules__row__text">Exact result:</span>
						<Input
							type="number"
							id="teamRulesExactResult"
							placeholder="3"
							className="teamRules__row__input"
							defaultValue={team?.rules.exactResult.points}
							ref={exactResultPointsRef}
						/>
					</div>
					<div className="teamRules__row">
						<span className="teamRules__row__text">Nothing:</span>
						<Input
							type="number"
							id="teamRulesNothing"
							placeholder="0"
							className="teamRules__row__input"
							defaultValue={team?.rules.nothing.points}
							ref={nothingPointsRef}
						/>
					</div>
					<div className="teamRules__row">
						<span className="teamRules__row__text">No tip:</span>
						<Input
							type="number"
							id="teamRulesNoTip"
							placeholder="0"
							className="teamRules__row__input"
							defaultValue={team?.rules.noTip.points}
							ref={noTipPointsRef}
						/>
					</div>
				</div>

				<div className="teamRules__section__info">
					<p className="teamRules__p">
						<strong className="teamRules__strong">Result only (1x2)</strong> means that tip
						only hits the winner of the match but not the exact result. For example if the
						final score is 2-1 and the tip is 1-0.
					</p>
					<p className="teamRules__p">
						<strong className="teamRules__strong">Exact result</strong> means that tip hits
						the exact result of the match. For example if the final score is 2-1 and the tip
						is 2-1 too.
					</p>
					<p className="teamRules__p">
						<strong className="teamRules__strong">Nothing</strong> is when the tip does not
						hit the winner. For example if the final score is 2-1 and the tip is 1-1 too.
					</p>
					<p className="teamRules__p">
						<strong className="teamRules__strong">No tip</strong> is when the user does not
						make a tip for the match.
					</p>
				</div>
			</section>

			<Subtitle>Advanced rules</Subtitle>
			<section className="teamRules__section teamRules__section--advanced">
				<div className="teamRules__section__inputs">
					<div className="teamRules__row">
						<Checkbox
							id="teamRulesHasGoalDifference"
							label="Points for hitting the goal difference"
							value={hasGoalDifference}
							onChange={(e) => setHasGoalDifference(e.target.checked)}
						/>
					</div>
					{hasGoalDifference && (
						<>
							<div className="teamRules__row">
								<span className="teamRules__row__text">Goal difference</span>
								<Input
									type="number"
									id="teamRulesGoalDifference"
									placeholder="2"
									className="teamRules__row__input"
									defaultValue={team?.rules.goalDifference.points}
									ref={goalDifferencePointsRef}
								/>
							</div>
						</>
					)}
				</div>

				<div className="teamRules__section__info">
					<p className="teamRules__p">
						You can get points for hitting the{" "}
						<strong className="teamRules__strong">goal difference</strong> if you also hit the
						winner. For example if the final score is 2-1 and the tip is 1-0.
					</p>
				</div>
			</section>

			<Button centered className="teamRules__save" onClick={savePoints}>
				<FontAwesomeIcon icon={faCheck} />
				Save
			</Button>
		</div>
	);
}

export default TeamRules;
