import { generalRules } from "../../assets/rules/generalRules";

// Function to check if the result of the tip and the result are the same
function isSameResult(tip, result) {
	// Team1 won
	if (tip.team1Score > tip.team2Score && result.team1Score > result.team2Score) return true;
	// Team2 won
	if (tip.team1Score < tip.team2Score && result.team1Score < result.team2Score) return true;
	// Draw
	if (tip.team1Score === tip.team2Score && result.team1Score === result.team2Score) return true;
	// None of the above
	return false;
}

// Function to check if the goal difference of the tip and the result are the same
function isSameGoalDifference(tip, result) {
	return result.team1Score - result.team2Score === tip.team1Score - tip.team2Score;
}

// Function to check if the tip and the result are exactly the same
function isExactResult(tip, result) {
	return tip.team1Score === result.team1Score && tip.team2Score === result.team2Score;
}

export default function calcMatchPoints(tip, result, rules = generalRules) {
	// If the result is not available
	if (result == null) return rules.noResult;

	// If the user didn't make a tip
	if (tip == null) return rules.noTip;

	// If the user hit the exact result
	if (isExactResult(tip, result)) return rules.exactResult;

	// If the user hit the goal difference
	if (isSameGoalDifference(tip, result)) return rules.goalDifference;

	// If the user hit the winner
	if (isSameResult(tip, result)) return rules.result;

	// If the user hit nothing
	return rules.nothing;
}
