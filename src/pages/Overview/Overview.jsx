import { useState } from "react";
import Select from "../../components/form/Select/Select";
import PageTitle from "../../components/ui/PageTitle/PageTitle";
import Subtitle from "../../components/ui/Subtitle/Subtitle";
import Section from "../../components/layout/Section/Section";
import "./Overview.css";
import Page from "../../components/layout/Page/Page";

const selectOptions = ["Option 1 Option 1 Option 1 Option 1", "Option 2", "Option 1"];

function Overview() {
	const [selectIndex, setSelectIndex] = useState(0);

	return (
		<Page>
			<Section id="overviewIntro" isIntro>
				<PageTitle>Overview</PageTitle>
			</Section>

			<Section id="overviewActiveTournament" isIntro className="overview__section--tournament">
				<Subtitle>Select tournament</Subtitle>

				<Select
					label="Label for the select"
					options={selectOptions}
					index={selectIndex}
					setIndex={setSelectIndex}
					id="select"
				/>
			</Section>
		</Page>
	);
}

export default Overview;
