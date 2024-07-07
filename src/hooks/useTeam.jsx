import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../config/firebase";
import { useStateValue } from "../contexts/context API/StateProvider";

function useTeam() {
	const [{ user }] = useStateValue();
	const [team, setTeam] = useState(null);
	const [isAdmin, setIsAdmin] = useState(false);
	const [loading, setLoading] = useState(true);
	const { teamId } = useParams();

	useEffect(() => {
		async function fetchTeam() {
			setLoading(true);

			try {
				const teamRef = doc(db, "teams", teamId);
				const teamSnapshot = await getDoc(teamRef);

				// If the team does not exist
				if (!teamSnapshot.exists()) {
					console.log("The team does not exist.");
					setLoading(false);
					return;
				}

				// If the user is not in the team
				const userRole = teamSnapshot
					.data()
					.roles.find((member) => member.member.id === user.uid);
				if (userRole == undefined) {
					console.log("You are not a member of this team.");
					setLoading(false);
					return;
				}

				// Set the states if everything is correct
				setTeam({ id: teamSnapshot.id, ...teamSnapshot.data() });
				setIsAdmin(userRole.role === "admin");
				setLoading(false);
			} catch (e) {
				console.log("Error fetching the team.", e);
				setLoading(false);
			}
		}

		if (!user || !teamId) return;

		fetchTeam();
	}, [teamId, user]);

	return { team, isAdmin, loading };
}

export default useTeam;
