import Container from "../../components/layout/Container/Container";
import PageTitle from "../../components/ui/PageTitle/PageTitle";
import Subtitle from "../../components/ui/Subtitle/Subtitle";
import "./Overview.css";

function Overview() {
	return (
		<div className="overview">
			<section id="overviewIntro" className="overview__section overview__section--intro">
				<Container centered>
					<PageTitle>Overview</PageTitle>

					<p className="overview__intro__p">
						Here you can find everything you need to know about your standing, groups, stats
						etc.
					</p>
				</Container>
			</section>

			<section
				id="overviewActiveTournament"
				className="overview__section overview__section--tournament"
			>
				<Container centered>
					<Subtitle>Select tournament</Subtitle>
					custom select goes here
				</Container>
			</section>
		</div>
	);
}

export default Overview;
