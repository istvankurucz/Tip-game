import PageTitle from "../../components/ui/PageTitle/PageTitle";
import Section from "../../components/layout/Section/Section";
import "./Overview.css";
import Page from "../../components/layout/Page/Page";
import { useStateValue } from "../../contexts/context API/StateProvider";
import { tournaments } from "../../assets/tournaments/tournaments";
import { Link } from "react-router-dom";

function Overview() {
	const [{ user }] = useStateValue();

	const tournament = tournaments.get(user?.activeTournament);

	return (
		<Page>
			<Section id="overviewIntro">
				<PageTitle className="overview__title">Overview</PageTitle>

				<div className="overview__tournament__active">
					<p className="overview__p">
						Tournament: <strong className="overview__tournament">{tournament?.name}</strong>
					</p>
					<Link to="/tournaments">Change</Link>
				</div>
			</Section>
		</Page>
	);
}

export default Overview;
