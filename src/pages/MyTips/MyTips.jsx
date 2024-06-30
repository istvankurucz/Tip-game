import Page from "../../components/layout/Page/Page";
import SelectedTournament from "../../components/ui/SelectedTournament/SelectedTournament";
import Section from "../../components/layout/Section/Section";
import Subtitle from "../../components/ui/Subtitle/Subtitle";
import Match from "../../components/ui/Match/Match";
import useMatches from "../../hooks/useMatches";
import getUpcomingMatches from "../../utils/match/getUpcomingMatches";
import { Fragment, useRef, useState } from "react";
import getPreviousMatches from "../../utils/match/getPreviousMatches";
import Spinner from "../../components/ui/Spinner/Spinner";
import Button from "../../components/ui/Button/Button";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import "./MyTips.css";
import { useStateValue } from "../../contexts/context API/StateProvider";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

function MyTips() {
	const [{ user }, dispatch] = useStateValue();
	const [saveLoading, setSaveLoading] = useState(false);
	const [showMatchInfo, setShowMatchInfo] = useState(false);
	const [matchInfo, setMatchInfo] = useState(null);
	const { matches, loading } = useMatches();
	// console.log(matches);

	const upcomingMatches = getUpcomingMatches(matches);
	const previousMatches = getPreviousMatches(matches);

	const saveButtonRef = useRef();

	// Function to show the modal for match information
	function showMatchInfoModal(match) {
		// Remove goals that didn't count
		match.info.goals = match.info.goals.filter((goal) => goal.goalGetterID !== 0);

		setMatchInfo(match.info);
		setShowMatchInfo(true);
	}

	// Function to get the values from the tip inputs
	function getTips(matchIds = []) {
		const res = {
			ok: true,
			message: "",
		};

		const tips = matchIds.map((matchId) => {
			const team1Input = document.getElementById(`${matchId}-team1-score`);
			const team2Input = document.getElementById(`${matchId}-team2-score`);

			const team1Tip = team1Input.valueAsNumber;
			const team2Tip = team2Input.valueAsNumber;

			if (team1Tip < 0 || team2Tip < 0) {
				(res.ok = false), (res.message = "Your tip cannot be less than 0 goal.");
			}

			return {
				id: matchId,
				team1Score: team1Tip,
				team2Score: team2Tip,
			};
		});

		if (res.ok) return { ...res, tips };
		return res;
	}

	// Function to reset the save button after the operations
	function resetSaveButton() {
		saveButtonRef.current.removeAttribute("disabled");
		setSaveLoading(false);
	}

	// Function to save the tips of the user to the DB
	function saveTips() {
		// 0. Disable save button
		saveButtonRef.current.setAttribute("disabled", "true");
		setSaveLoading(true);

		// 1. Get the matchIds
		const matchIds = getUpcomingMatches(matches).map((match) => match.id);
		// console.log(matchIds);

		// 2. Get the tips
		const { tips, ok, message } = getTips(matchIds);
		// console.log(tips);
		if (!ok) {
			dispatch({
				type: "SET_FEEDBACK",
				feedback: {
					show: true,
					type: "error",
					message: message,
					details: "",
				},
			});

			resetSaveButton();

			return;
		}

		// 3. Update the tips in the DB
		try {
			tips.forEach(async (tip) => {
				const tipRef = doc(
					db,
					`users/${user.uid}/tournaments/${user.activeTournament}/matches/${tip.id}`
				);
				await setDoc(tipRef, {
					team1Score: tip.team1Score,
					team2Score: tip.team2Score,
				});
			});

			dispatch({
				type: "SET_FEEDBACK",
				feedback: {
					show: true,
					type: "success",
					message: "Your tips were saved successfully!",
					details: "",
				},
			});

			resetSaveButton();
		} catch (e) {
			console.log("Error updaeting the tips in the DB.", e);
		}
	}

	return (
		<Page hasUserLoading>
			<Match.Info
				show={showMatchInfo}
				setShow={setShowMatchInfo}
				flags={{ team1: matches[0]?.team1.iconUrl, team2: matches[0]?.team2.iconUrl }}
				data={matchInfo}
			/>

			<Page.Title>My tips</Page.Title>

			<Page.Body userNeeded>
				<Section id="myTipsTournament">
					<SelectedTournament />
				</Section>

				<Section id="myTipsUpcoming">
					<Subtitle>Upcoming matches</Subtitle>

					<div className="myTips__table myTips__table--upcoming">
						{loading ? (
							<Spinner
								text="Loading upcoming matches..."
								centered
								className="myTips__table__spinner"
							/>
						) : (
							upcomingMatches.map((match, i) => (
								<Fragment key={match.id}>
									<Match
										id={match.id}
										time={match.time}
										team1={match.team1}
										team2={match.team2}
										tip={match.tip}
										result={match.result}
										finished={match.finished}
										onInfoClick={() => showMatchInfoModal(match)}
									/>
									{i !== upcomingMatches.length - 1 && (
										<hr className="myTips__table__divider" />
									)}
								</Fragment>
							))
						)}
					</div>

					<Button
						centered
						className="myTips__table__upcoming__save"
						onClick={saveTips}
						ref={saveButtonRef}
					>
						<FontAwesomeIcon icon={faCheck} />
						{saveLoading ? "Loading..." : "Save"}
					</Button>
				</Section>

				<Section id="myTipsPrevious">
					<Subtitle>Previous matches</Subtitle>

					<div className="myTips__table myTips__table--previous">
						{loading ? (
							<Spinner
								text="Loading previous matches..."
								centered
								className="myTips__table__spinner"
							/>
						) : (
							previousMatches.map((match, i) => (
								<Fragment key={match.id}>
									<Match
										id={match.id}
										time={match.time}
										team1={match.team1}
										team2={match.team2}
										tip={null}
										result={match.result}
										finished={match.finished}
										onInfoClick={() => showMatchInfoModal(match)}
									/>
									{i !== previousMatches.length - 1 && (
										<hr className="myTips__table__divider" />
									)}
								</Fragment>
							))
						)}
					</div>
				</Section>
			</Page.Body>
		</Page>
	);
}

export default MyTips;
