export default function getUpcomingMatches(matches = []) {
	const now = new Date();

	return matches.filter(
		(match) => new Date(match.time) > now && match.team1 != undefined && match.team2 != undefined
	);
}
