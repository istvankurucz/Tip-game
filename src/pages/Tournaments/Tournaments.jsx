import Select from "../../components/form/Select/Select";
import Section from "../../components/layout/Section/Section";
import PageTitle from "../../components/ui/PageTitle/PageTitle";
import Subtitle from "../../components/ui/Subtitle/Subtitle";
import { tournaments } from "../../assets/tournaments/tournaments";
import "./Tournaments.css";
import { useState } from "react";
import Page from "../../components/layout/Page/Page";
import Button from "../../components/ui/Button/Button";

const selectOptions = Array.from(tournaments?.values()).map((tournament) => tournament.name);

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

				<form className="tournament__select__form">
					<Select
						label="Tournament"
						id="tournamentsSelectInput"
						options={selectOptions}
						index={selectIndex}
						setIndex={setSelectIndex}
					/>
					<Button type="submit">Save</Button>
				</form>
			</Section>
		</Page>
	);
}

export default Tournaments;
