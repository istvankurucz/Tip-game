import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "../config/firebase";
import { useStateValue } from "../contexts/context API/StateProvider";

function useAuth() {
	const [, dispatch] = useStateValue();

	useEffect(() => {
		const unsub = onAuthStateChanged(auth, (userAuth) => {
			console.log("User from auth:", userAuth);

			dispatch({
				type: "SET_USER",
				user: userAuth,
			});
		});

		// Clear the listener
		return unsub;
	}, [dispatch]);
}

export default useAuth;
