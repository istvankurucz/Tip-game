import Page from "../../components/layout/Page/Page";
import Section from "../../components/layout/Section/Section";
import PageTitle from "../../components/ui/PageTitle/PageTitle";
import SelectedTournament from "../../components/ui/SelectedTournament/SelectedTournament";
import useMatches from "../../hooks/useMatches";
import "./MyTips.css";

function MyTips() {
	const { matches } = useMatches();

	console.log(matches);

	return (
		<Page>
			<Section id="myTipsIntro">
				<PageTitle>My tips</PageTitle>

				<SelectedTournament />
			</Section>
		</Page>
	);
}

export default MyTips;
