import PageTitle from "../../components/ui/PageTitle/PageTitle";
import Section from "../../components/layout/Section/Section";
import "./Overview.css";
import Page from "../../components/layout/Page/Page";
import SelectedTournament from "../../components/ui/SelectedTournament/SelectedTournament";

function Overview() {
	return (
		<Page>
			<Section id="overviewIntro">
				<PageTitle className="overview__title">Overview</PageTitle>

				<SelectedTournament />
			</Section>
		</Page>
	);
}

export default Overview;
