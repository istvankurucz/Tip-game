import PropTypes from "prop-types";
import "./JoinTeamModal.css";
import Overlay from "../../components/layout/Overlay/Overlay";
import Modal from "../../components/layout/Modal/Modal";
import Input from "../../components/form/Input/Input";
import { useRef, useState } from "react";
import Button from "../../components/ui/Button/Button";
import { useStateValue } from "../../contexts/context API/StateProvider";
import { arrayUnion, collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useNavigate } from "react-router-dom";

function JoinTeamModal({ show, setShow }) {
	const [{ user }, dispatch] = useStateValue();
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const codeRef = useRef();
	const submitButtonRef = useRef();

	// Function to reset the submit button to enabled
	function resetSubmitButton() {
		submitButtonRef.current.removeAttribute("disabled");
		setLoading(false);
	}

	// Function to create messages to Feedback component from error codes
	function createFeedbackMessage(errorCode) {
		switch (errorCode) {
			case "team-not-found": {
				return { message: "Team not found.", details: "" };
			}
			case "user-already-in-team": {
				return { message: "You are already in this team.", details: "" };
			}
			default: {
				return { message: "An error occured.", details: "Please try again later." };
			}
		}
	}

	// Function to join to a team
	async function joinTeam(e) {
		e.preventDefault();

		// 0. Disable submit button
		submitButtonRef.current.setAttribute("disabled", "true");
		setLoading(true);

		try {
			const teamsRef = collection(db, "teams");
			const teamQuery = query(teamsRef, where("joinCode", "==", codeRef.current.value.trim()));
			const teamsSnapshot = await getDocs(teamQuery);

			// Check if there is a team with this join code
			if (teamsSnapshot.empty) throw new Error("team-not-found");

			// Check if the user is already in the team
			const team = teamsSnapshot.docs[0];
			const memberCurrentUser = team.data().members.find((member) => member.id === user.uid);
			if (memberCurrentUser != undefined) throw new Error("user-already-in-team");

			// Add the user to the team with 'player' role
			const teamRef = doc(db, "teams", team.id);
			const memberRef = doc(db, "users", user.uid);
			await updateDoc(teamRef, {
				members: arrayUnion(memberRef),
				roles: arrayUnion({ member: memberRef, role: "player" }),
			});

			// Navigate to the new team's page
			setShow(false);
			navigate(`/teams/${team.id}/ranking`);

			resetSubmitButton();
		} catch (e) {
			console.log("Error joining to team.", e);

			const { message, details } = createFeedbackMessage(e.message);

			dispatch({
				type: "SET_FEEDBACK",
				feedback: {
					show: true,
					type: "error",
					message,
					details,
				},
			});
			resetSubmitButton();
		}
	}

	return (
		<Overlay show={show}>
			<Modal title="Join to a team" setShow={setShow}>
				<form className="joinTeamModal__form" onSubmit={joinTeam}>
					<Modal.Body>
						<Input
							label="Joining code"
							id="joinTeamModalCode"
							placeholder="Joining code"
							required
							fullW
							ref={codeRef}
						/>

						<p className="joinTeamModal__p">Enter the code of the team to join.</p>
					</Modal.Body>

					<Modal.Footer>
						<Button type="button" variant="secondary" onClick={() => setShow(false)}>
							Cancel
						</Button>
						<Button type="submit" variant="accent" ref={submitButtonRef}>
							{loading ? "Loading..." : "Join"}
						</Button>
					</Modal.Footer>
				</form>
			</Modal>
		</Overlay>
	);
}

JoinTeamModal.propTypes = {
	show: PropTypes.bool.isRequired,
	setShow: PropTypes.func.isRequired,
};

export default JoinTeamModal;
