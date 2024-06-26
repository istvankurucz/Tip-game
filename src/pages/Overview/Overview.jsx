import { useState } from "react";
import Select from "../../components/form/Select/Select";
import Container from "../../components/layout/Container/Container";
import PageTitle from "../../components/ui/PageTitle/PageTitle";
import Subtitle from "../../components/ui/Subtitle/Subtitle";
import "./Overview.css";

const selectOptions = ["Option 1 Option 1 Option 1 Option 1", "Option 2", "Option 1"];

function Overview() {
	const [selectIndex, setSelectIndex] = useState(0);

	return (
		<div className="overview">
			<section id="overviewIntro" className="overview__section overview__section--intro">
				<Container centered>
					<PageTitle>Overview</PageTitle>
				</Container>
			</section>

			<section
				id="overviewActiveTournament"
				className="overview__section overview__section--tournament"
			>
				<Container centered>
					<Subtitle>Select tournament</Subtitle>

					<Select
						label="Label for the select"
						options={selectOptions}
						index={selectIndex}
						setIndex={setSelectIndex}
						id="select"
					/>
				</Container>
			</section>
		</div>
	);
}

export default Overview;
