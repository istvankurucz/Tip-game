import Page from "../../components/layout/Page/Page";
// import useMatches from "../../hooks/useMatches";
import "./MyTips.css";

function MyTips() {
	// const { matches } = useMatches();

	// console.log(matches);

	return (
		<Page hasUserLoading>
			<Page.Title>My tips</Page.Title>

			<Page.Body userNeeded>My tips</Page.Body>
		</Page>
	);
}

export default MyTips;
