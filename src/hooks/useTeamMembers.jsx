import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../config/firebase";

function useTeamMembers(memberIds = []) {
	const [members, setMembers] = useState([]);

	useEffect(() => {
		async function fetchTeamMembers() {
			const memberPromises = memberIds.map(async (memberId) => {
				try {
					const userRef = doc(db, "users", memberId);
					const user = await getDoc(userRef);
					return {
						id: user.id,
						...user.data(),
					};
				} catch (e) {
					console.log("Error fetching the data of the members.", e);
				}
			});

			const members = await Promise.all(memberPromises);
			setMembers(members);
		}

		if (memberIds.length === 0) return;

		fetchTeamMembers();
	}, [memberIds]);

	return members;
}

export default useTeamMembers;
