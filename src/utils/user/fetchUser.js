import { doc, getDoc } from "firebase/firestore";
import { db } from "../../config/firebase";

// Function to fetch the data of the user from the DB
export default async function fetchUser(userId) {
	try {
		const userRef = doc(db, "users", userId);
		const user = await getDoc(userRef);

		return user.data();
	} catch (e) {
		console.log("Error fetching the user.\n", e);
	}
}
