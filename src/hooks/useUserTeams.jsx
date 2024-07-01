import { useEffect, useState } from "react";
import { useStateValue } from "../contexts/context API/StateProvider";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/firebase";

function useUserTeams() {
	const [{ user }] = useStateValue();
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

				// console.log("Teams of the user:", userTeams);

				setTeams(userTeams.docs.map((team) => ({ id: team.id, ...team.data() })));
				setLoading(false);
			} catch (e) {
				console.log("Error fetching the teams of the user.", e);
				setLoading(false);
			}
		}

		if (!user) return;

		fetchUserTeams();
	}, [user]);

	return { teams, loading };
}

export default useUserTeams;
