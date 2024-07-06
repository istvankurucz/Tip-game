import { useEffect, useState } from "react";
import { useStateValue } from "../contexts/context API/StateProvider";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/firebase";
// import useMatches from "./useMatches";
// import calcTournamentPoints from "../utils/tournament/calcTournamentPoints";

function useUserTeams() {
	const [{ user }] = useStateValue();
	// const { matches } = useMatches();
	const [teams, setTeams] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function fetchUserTeams() {
			setLoading(true);

			try {
				const teamsRef = collection(db, "teams");
				const userRef = doc(db, "users", user.uid);
				const userTeamsQuery = query(teamsRef, where("members", "array-contains", userRef));
				const userTeams = await getDocs(userTeamsQuery);

				// const teamsWithRank = userTeams.docs.map((team) => {
				// 	// Calculate the sum of the points for every member
				// 	const membersWithPoints = team.data().members.map((member) => ({
				// 		member,
				// 		points: calcTournamentPoints(matches, team.data().rules),
				// 	}));
				// 	return membersWithPoints;

				// 	// Sort the members based on their points
				// 	const sortedMembers = membersWithPoints.sort((a,b) => b.points - a.points)
				// 	// const membersWithRank = team.members.map(member=> ({member, rank: }))
				// });

				// console.log("Teams with rank", teamsWithRank);

				setTeams(
					userTeams.docs.map((team) => ({
						id: team.id,
						...team.data(),
					}))
				);
				setLoading(false);
			} catch (e) {
				console.log("Error fetching the teams of the user.", e);
				setLoading(false);
			}
		}

		if (!user /*|| matches.length === 0*/) return;

		fetchUserTeams();
	}, [user /*matches*/]);

	return { teams, loading };
}

export default useUserTeams;
