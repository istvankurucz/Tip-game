import Select from "../../components/form/Select/Select";
import Section from "../../components/layout/Section/Section";
import PageTitle from "../../components/ui/PageTitle/PageTitle";
import Subtitle from "../../components/ui/Subtitle/Subtitle";
import { leagues } from "../../assets/leagues/leagues";
import "./Tournaments.css";
import { useState } from "react";
import Page from "../../components/layout/Page/Page";

const selectOptions = Array.from(leagues.values()).map((league) => league.leagueName);

function Tournaments() {
	const [selectIndex, setSelectIndex] = useState(0);

	return (
		<Page>
			<Section id="tournamentsIntro">
				<PageTitle className="tournaments__title">Tournaments</PageTitle>

				<p className="tournaments__p">
					Here you can find all of the tournaments you can compete in.
					<br />
					Just use the dropdown below to choose one.
				</p>
			</Section>

			<Section id="tournamentsSelect" className="tournaments__section--select">
				<Subtitle>Select a tournament</Subtitle>

				<Select
					label="Tournament"
					id="tournamentsSelectInput"
					options={selectOptions}
					index={selectIndex}
					setIndex={setSelectIndex}
				/>
			</Section>
		</Page>
	);
}

export default Tournaments;
