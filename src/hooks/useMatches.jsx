import { useEffect, useState } from "react";
import useActiveTournament from "./useActiveTournament";
import { useStateValue } from "../contexts/context API/StateProvider";
import fetchMatches from "../utils/match/fetchMatches";
import fetchUserTips from "../utils/user/fetchUserTips";
import pairMatchesWithTips from "../utils/match/pairMatchesWithTips";

function useMatches() {
	const [{ user }] = useStateValue();
	const tournament = useActiveTournament();
	const [matches, setMatches] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		async function fetchMacthesWithUserTips() {
			setLoading(true);
			try {
				// Get the matches from the API
				const matchData = await fetchMatches(tournament);

				// Get the tips of the user from DB
				const tips = await fetchUserTips(user.uid, user.activeTournament);

				// Pair the matches with the tips of the user
				const matchesWithTips = pairMatchesWithTips(matchData, tips);

				setMatches(matchesWithTips);
				setLoading(false);
			} catch (e) {
				console.log("Error fetching the matches.", e);
				setLoading(false);
			}
		}

		if (!tournament || !user) return;

		fetchMacthesWithUserTips();
	}, [tournament, user]);

	return { matches, loading };
}

export default useMatches;
