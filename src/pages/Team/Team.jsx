import { Outlet } from "react-router-dom";
import Page from "../../components/layout/Page/Page";
import "./Team.css";
import TeamRanking from "./TeamRanking";
import TeamSidebar from "./TeamSidebar";
import Container from "../../components/layout/Container/Container";
import TeamRules from "./TeamRules";
import { useTeamContext } from "../../contexts/TeamContext";

function Team() {
	const { team, loading } = useTeamContext();

	if (team == null && !loading) {
		return <h1>The team is not found.</h1>;
	}

	return (
		<Page hasUserLoading>
			<Page.Title>{team == null ? "Team name" : team.name}</Page.Title>

			<Page.Body userNeeded>
				<Container centered className="team__body">
					<Team.Sidebar />
					<div className="team__main">
						<Outlet />
					</div>
				</Container>
			</Page.Body>
		</Page>
	);
}

Team.Sidebar = TeamSidebar;
Team.Ranking = TeamRanking;
Team.Rules = TeamRules;

export default Team;
