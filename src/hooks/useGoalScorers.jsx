import { useEffect, useState } from "react";
import { useStateValue } from "../contexts/context API/StateProvider";
import { tournaments } from "../assets/tournaments/tournaments";
import { axios } from "../config/axios";

function useGoalScorers(scorerIds = []) {
	const [{ user }] = useStateValue();
	const [goalScorers, setGoalScorers] = useState([]);

	// Get the tournament
	const tournament = user ? tournaments.get(user.activeTournament) : null;

	useEffect(() => {
		async function getGoalScorers() {
			if (scorerIds.length === 0) return;

			// console.log("Url:", `/getgoalgetters/${tournament.shortcut}/${tournament.season}`);

			try {
				// Fetch the goalscorers of the tournament
				const { data } = await axios.get(
					`/getgoalgetters/${tournament.shortcut}/${tournament.season}`
				);

				// Filter the scorers
				const scorers = data.filter((scorer) => scorerIds.includes(scorer.goalGetterId));

				// Restructure the objects
				setGoalScorers(
					scorers.map((scorer) => ({
						id: scorer.goalGetterId,
						name: scorer.goalGetterName,
					}))
				);
			} catch (e) {
				console.log("Error fetching the goalscorers.", e);
			}
		}

		if (tournament == null || scorerIds.length === 0) return;

		// console.log("effect running");
		getGoalScorers();
	}, [tournament, scorerIds]);

	return goalScorers;
}

export default useGoalScorers;
