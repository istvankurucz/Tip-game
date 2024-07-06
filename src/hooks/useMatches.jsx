/* eslint-disable no-mixed-spaces-and-tabs */
import { useEffect, useState } from "react";
import useActiveTournament from "./useActiveTournament";
import { axios } from "../config/axios";
import getMatchData from "../utils/match/getMatchData";
import { useStateValue } from "../contexts/context API/StateProvider";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

// Function to decide if the stored tip is valid
function getTipFromDbData(tip) {
	// If there is no tip for this match
	if (tip == undefined) return null;
	// If the user didn't filled the inputs for goals
	if (isNaN(tip.data().team1Score) || isNaN(tip.data().team2Score)) return null;
	// Ok
	return { team1Score: tip.data().team1Score, team2Score: tip.data().team2Score };
}

function useMatches() {
	const [{ user }] = useStateValue();
	const tournament = useActiveTournament();
	const [matches, setMatches] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		async function fetchMacthes() {
			setLoading(true);
			try {
				// Get the macthes from the API
				const { data } = await axios.get(
					`/getmatchdata/${tournament.shortcut}/${tournament.season}`
				);

				const matchData = data.map((match) => getMatchData(match));

				// Get the tips from the DB
				const userTipsRef = collection(
					db,
					`users/${user.uid}/tournaments/${user.activeTournament}/matches`
				);
				const tips = (await getDocs(userTipsRef)).docs;
				// console.log("Tips:", tips);

				const matchesWithTips = matchData.map((match) => {
					const matchTip = tips.find((tip) => parseInt(match.id) === parseInt(tip.id));

					return {
						...match,
						tip: getTipFromDbData(matchTip),
					};
				});

				setLoading(false);
				setMatches(matchesWithTips);
			} catch (e) {
				console.log("Error fetching the matches.", e);
				setLoading(false);
			}
		}

		if (!tournament || !user) return;

		fetchMacthes();
	}, [tournament, user]);

	return { matches, loading };
}

export default useMatches;
