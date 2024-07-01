/* eslint-disable no-mixed-spaces-and-tabs */
import { useEffect, useState } from "react";
import useActiveTournament from "./useActiveTournament";
import { axios } from "../config/axios";
import getMatchData from "../utils/match/getMatchData";
import { useStateValue } from "../contexts/context API/StateProvider";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";

function useMatches() {
	const [{ user }] = useStateValue();
	const tournament = useActiveTournament();
	const [matches, setMatches] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (!tournament || !user) return;

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
						tip:
							matchTip == undefined
								? null
								: {
										team1Score: isNaN(matchTip.data().team1Score)
											? ""
											: matchTip.data().team1Score,
										team2Score: isNaN(matchTip.data().team2Score)
											? ""
											: matchTip.data().team2Score,
								  },
					};
				});

				setLoading(false);
				setMatches(matchesWithTips);
			} catch (e) {
				console.log("Error fetching the matches.", e);
				setLoading(false);
			}
		}

		fetchMacthes();
	}, [tournament, user]);

	return { matches, loading };
}

export default useMatches;
