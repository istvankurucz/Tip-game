import { useEffect, useState } from "react";
import fetchMatches from "../utils/match/fetchMatches";
import useActiveTournament from "./useActiveTournament";
import fetchUserTips from "../utils/user/fetchUserTips";
import pairMatchesWithTips from "../utils/match/pairMatchesWithTips";
import { useStateValue } from "../contexts/context API/StateProvider";
import calcTournamentPoints from "../utils/tournament/calcTournamentPoints";
import fetchUser from "../utils/user/fetchUser";

function useTeamranking(team) {
	const [{ user }] = useStateValue();
	const tournament = useActiveTournament();
	const [ranking, setRanking] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchMembersTips() {
			setLoading(true);
			try {
				// Fetch the matches
				const matches = await fetchMatches(tournament);

				// Loop throught the members and calculate their points
				const membersWithPoints = await Promise.all(
					team.members.map(async (member) => {
						// Fetch the data of the member
						const memberData = await fetchUser(member.id);

						// Fetch the tips of the member
						const tips = await fetchUserTips(member.id, user.activeTournament);

						// Pair the matches with the tips
						const matchesWithTips = pairMatchesWithTips(matches, tips);

						// Calculate the points of the member
						const points = calcTournamentPoints(matchesWithTips, team.rules);

						return {
							member: {
								id: member.id,
								name: memberData.name,
							},
							points,
						};
					})
				);

				// Make the ranking by sorting the members descending based on their points
				const membersSortedByPoints = membersWithPoints.toSorted(
					(member1, member2) => member2.points - member1.points
				);

				// Add the rank property to the members
				const ranking = membersSortedByPoints.map((member, i) => ({ ...member, rank: i + 1 }));

				setRanking(ranking);
				setLoading(false);
			} catch (e) {
				console.log("Error fetching the tips of the members.", e);
				setLoading(false);
			}
		}

		if (user == null || tournament == null || team == null) return;

		fetchMembersTips();
	}, [user, tournament, team]);

	return { ranking, loading };
}

export default useTeamranking;
