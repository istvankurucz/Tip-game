export default function pairMatchesWithTips(matches = [], tips = []) {
	if (matches.length === 0) return [];

	const matchesWithTips = matches.map((match) => {
		const matchTip = tips.find((tip) => parseInt(match.id) === parseInt(tip.id));

		return {
			...match,
			tip: getTipFromDbData(matchTip),
		};
	});
	return matchesWithTips;
}

// Function to decide if the stored tip is valid
function getTipFromDbData(tip) {
	// If there is no tip for this match
	if (tip == undefined) return null;
	// If the user didn't filled the inputs for goals
	if (isNaN(tip.data().team1Score) || isNaN(tip.data().team2Score)) return null;
	// Ok
	return { team1Score: tip.data().team1Score, team2Score: tip.data().team2Score };
}
