import { Outlet } from "react-router-dom";
import Page from "../../components/layout/Page/Page";
import "./Team.css";
import TeamRanking from "./TeamRanking";
import TeamSidebar from "./TeamSidebar";
import Container from "../../components/layout/Container/Container";
import TeamRules from "./TeamRules";
import { useTeamContext } from "../../contexts/TeamContext";
import TeamSettings from "./TeamSettings";
import TeamSection from "../../components/layout/Section/TeamSection/TeamSection";
import TeamP from "../../components/ui/P/TeamP/TeamP";

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

Team.Section = TeamSection;
Team.P = TeamP;
Team.Sidebar = TeamSidebar;
Team.Ranking = TeamRanking;
Team.Rules = TeamRules;
Team.Settings = TeamSettings;

export default Team;
