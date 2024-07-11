import { axios } from "../../config/axios";
import getMatchData from "./getMatchData";

export default async function fetchMatches(tournament) {
	if (tournament == null) return [];

	const { shortcut, season } = tournament;

	try {
		const { data } = await axios.get(`/getmatchdata/${shortcut}/${season}`);

		return data.map((match) => getMatchData(match));
	} catch (e) {
		console.log("Error fetching the matches.", e);
		return [];
	}
}
