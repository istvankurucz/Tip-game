/* eslint-disable no-mixed-spaces-and-tabs */
import { teams } from "../../assets/teams/teamsEuro2024";

function getMatchResult(results) {
	// If there is no result yet
	if (results.length === 0) return null;

	const resultAfterRegularTime = results.find((result) => result.resultTypeID === 2);
	return {
		team1Score: resultAfterRegularTime.pointsTeam1,
		team2Score: resultAfterRegularTime.pointsTeam2,
	};
}

export default function getMatchData(match) {
	return {
		id: match.matchID,
		time: match.matchDateTimeUTC,
		team1: teams.get(match.team1.teamId),
		team2: teams.get(match.team2.teamId),
		result: getMatchResult(match.matchResults),
		finished: match.matchIsFinished,
		info: {
			location: {
				city: match.location.locationCity,
				stadium: match.location.locationStadium,
			},
			viewers: match.numberOfViewers,
			goals: match.goals,
		},
	};
}
