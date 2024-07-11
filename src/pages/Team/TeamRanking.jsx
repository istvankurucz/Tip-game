import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Table from "../../components/layout/Table/Table";
import Subtitle from "../../components/ui/Subtitle/Subtitle";
import Team from "./Team";
import { faSort } from "@fortawesome/free-solid-svg-icons";
import { useTeamContext } from "../../contexts/TeamContext";
import useTeamRanking from "../../hooks/useTeamRanking";
import "./TeamRanking.css";
import Spinner from "../../components/ui/Spinner/Spinner";
import { useState } from "react";
import setSortParams from "../../utils/general/setSortParams";

function TeamRanking() {
	const { team } = useTeamContext();
	const { ranking, loading } = useTeamRanking(team);
	const [sort, setSort] = useState({ property: "name", asc: false });

	const sortedRanking = sortRanking(ranking, sort.property, sort.asc);

	// Function to sort the ranking
	function sortRanking(ranking, property, asc = true) {
		function byRank(a, b) {
			if (asc) return a.rank - b.rank;
			else return b.rank - a.rank;
		}
		function byName(a, b) {
			if (asc) return a.member.name > b.member.name ? 1 : a.member.name < b.member.name ? -1 : 0;
			else return a.member.name < b.member.name ? 1 : a.member.name > b.member.name ? -1 : 0;
		}

		switch (property) {
			case "points":
			case "rank": {
				return ranking.toSorted((a, b) => byRank(a, b));
			}
			case "name": {
				return ranking.toSorted((a, b) => byName(a, b));
			}
			default: {
				return ranking;
			}
		}
	}

	return (
		<div className="teamRanking">
			<Team.Section id="teamRankingIntro">
				<Subtitle>Ranking</Subtitle>

				<Team.P>Check where you are currently on the leaderboard.</Team.P>
			</Team.Section>

			<Team.Section id="teamRankingLeaderboard">
				{loading ? (
					<Spinner text="Loading the leaderboard..." centered />
				) : (
					<Table sortable className="teamRanking__table">
						<thead>
							<tr>
								<th onClick={() => setSortParams("rank", setSort)}>
									Rank <FontAwesomeIcon icon={faSort} />
								</th>
								<th onClick={() => setSortParams("name", setSort)}>
									Name <FontAwesomeIcon icon={faSort} />
								</th>
								<th>Winner, top scorer</th>
								<th onClick={() => setSortParams("points", setSort)}>
									Points <FontAwesomeIcon icon={faSort} />
								</th>
							</tr>
						</thead>

						<tbody>
							{sortedRanking?.map((rank) => (
								<tr key={rank.member.id}>
									<td>#{rank.rank}</td>
									<td>{rank.member.name}</td>
									<td>Winner, top scorer</td>
									<td>{rank.points}</td>
								</tr>
							))}
						</tbody>
					</Table>
				)}
			</Team.Section>
		</div>
	);
}

export default TeamRanking;
