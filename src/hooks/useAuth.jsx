import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "../config/firebase";
import { useStateValue } from "../contexts/context API/StateProvider";
import fetchUser from "../utils/user/fetchUser";

function useAuth() {
	const [, dispatch] = useStateValue();

	useEffect(() => {
		const unsub = onAuthStateChanged(auth, async (user) => {
			dispatch({
				type: "SET_USER_LOADING",
				userLoading: true,
			});

			// Fetch user data from DB
			if (user != null) {
				const userDb = await fetchUser(user.uid);
				user = {
					...user,
					...userDb,
				};
			}

			console.log("User:", user);

			// Update Context API with the user
			dispatch({
				type: "SET_USER",
				user,
			});

			dispatch({
				type: "SET_USER_LOADING",
				userLoading: false,
			});
		});

		// Clear the listener
		return unsub;
	}, [dispatch]);
}

export default useAuth;
