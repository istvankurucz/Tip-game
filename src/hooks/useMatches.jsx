import { useEffect, useState } from "react";
import useActiveTournament from "./useActiveTournament";
import { axios } from "../config/axios";

function useMatches() {
	const tournament = useActiveTournament();
	const [matches, setMatches] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if (!tournament) return;

		async function fetchMacthes() {
			setLoading(true);
			try {
				const res = await axios.get(
					`/getmatchdata/${tournament.shortcut}/${tournament.season}`
				);

				setLoading(false);
				setMatches(res.data);
			} catch (e) {
				console.log("Error fetching the matches.", e);
				setLoading(false);
			}
		}

		fetchMacthes();
	}, [tournament]);

	return { matches, loading };
}

export default useMatches;
