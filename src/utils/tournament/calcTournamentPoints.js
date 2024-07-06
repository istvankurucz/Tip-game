import calcMatchPoints from "../match/calcMatchPoints";

export default function calcTournamentPoints(matches, rules) {
	return matches.reduce((total, match) => {
		const { points } = calcMatchPoints(match.tip, match.result, rules);
		return total + points;
	}, 0);
}
