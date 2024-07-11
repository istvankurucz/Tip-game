import { collection, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";

export default async function fetchUserTips(userId = "", tournamentId = "") {
	if (userId === "" || tournamentId === "") return [];

	try {
		const userTipsRef = collection(db, `users/${userId}/tournaments/${tournamentId}/matches`);
		const tipsSnapshot = await getDocs(userTipsRef);
		return tipsSnapshot.docs;
	} catch (e) {
		console.log("Error fetching the tips of the user.", e);
		return [];
	}
}
