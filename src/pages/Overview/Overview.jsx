import Page from "../../components/layout/Page/Page";
import "./Overview.css";

function Overview() {
	return (
		<Page hasUserLoading>
			<Page.Title className="overview__title">Overview</Page.Title>

			<Page.Body userNeeded>overview</Page.Body>
		</Page>
	);
}

export default Overview;
