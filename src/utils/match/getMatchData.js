import { teams } from "../../assets/teams/teamsEuro2024";

export default function getMatchData(match) {
	return {
		id: match.matchID,
		time: match.matchDateTimeUTC,
		team1: teams.get(match.team1.teamId),
		team2: teams.get(match.team2.teamId),
		result:
			match.matchResults.length === 0
				? null
				: {
						team1Score: match.matchResults[0].pointsTeam1,
						team2Score: match.matchResults[0].pointsTeam2,
				  },
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
