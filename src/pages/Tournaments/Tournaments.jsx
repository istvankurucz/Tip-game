import Select from "../../components/form/Select/Select";
import Section from "../../components/layout/Section/Section";
import PageTitle from "../../components/ui/PageTitle/PageTitle";
import Subtitle from "../../components/ui/Subtitle/Subtitle";
import { tournaments } from "../../assets/tournaments/tournaments";
import { useState } from "react";
import Page from "../../components/layout/Page/Page";
import Button from "../../components/ui/Button/Button";
import "./Tournaments.css";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useStateValue } from "../../contexts/context API/StateProvider";

const selectOptions = Array.from(tournaments?.values()).map((tournament) => tournament.name);

function Tournaments() {
	const [{ user }, dispatch] = useStateValue();
	const [selectIndex, setSelectIndex] = useState(0);

	// Function to change the activeTournament property of the user
	async function changeActiveTournament(e) {
		e.preventDefault();

		// Check if the user selected another tournament
		const newActiveTournament = Array.from(tournaments.keys())[selectIndex];
		if (newActiveTournament === user.activeTournament) return;

		try {
			// Update the user in th DB
			const userRef = doc(db, "users", user.uid);
			await updateDoc(userRef, {
				activeTournament: newActiveTournament,
			});

			// Set the active tournament of the user in local context
			dispatch({
				type: "SET_USER",
				user: {
					...user,
					activeTournament: newActiveTournament,
				},
			});

			// Show feedback that the operation was successful
			dispatch({
				type: "SET_FEEDBACK",
				feedback: {
					show: true,
					type: "success",
					message: "Changes saved",
					details: "",
				},
			});
		} catch (e) {
			console.log("Error updating the active tournament of the user.", e);
		}
	}

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

				<form className="tournament__select__form" onSubmit={changeActiveTournament}>
					<Select
						width="300px"
						label="Tournament"
						id="tournamentsSelectInput"
						options={selectOptions}
						index={selectIndex}
						setIndex={setSelectIndex}
						className="tournament__select__form__input"
					/>
					<Button type="submit">Save</Button>
				</form>
			</Section>
		</Page>
	);
}

export default Tournaments;
