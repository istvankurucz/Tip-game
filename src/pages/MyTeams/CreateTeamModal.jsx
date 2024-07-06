import PropTypes from "prop-types";
import Modal from "../../components/layout/Modal/Modal";
import Overlay from "../../components/layout/Overlay/Overlay";
import Button from "../../components/ui/Button/Button";
import Input from "../../components/form/Input/Input";
import { useStateValue } from "../../contexts/context API/StateProvider";
import "./CreateTeamModal.css";
import { useRef, useState } from "react";
import { addDoc, collection, doc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { generalRules } from "../../assets/rules/generalRules";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

function CreateTeamModal({ show, setShow }) {
	const [{ user }] = useStateValue();
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const submitButtonRef = useRef();
	const teamNameRef = useRef();

	// Function to reset the submit button to enabled
	function resetSubmitButton() {
		submitButtonRef.current.removeAttribute("disabled");
		setLoading(false);
	}

	// Function to create a team
	async function createTeam(e) {
		e.preventDefault();

		// 0. Disable the submit button
		submitButtonRef.current.setAttribute("disabled", "true");
		setLoading(true);

		// 1. Get the name of the team
		const teamName = teamNameRef.current.value.trim();

		// 2. Create the team in DB
		try {
			const teamsRef = collection(db, "teams");
			const team = await addDoc(teamsRef, {
				name: teamName,
				rules: generalRules,
				members: [doc(db, "users", user.uid)],
				roles: [{ member: doc(db, "users", user.uid), role: "admin" }],
				joinCode: uuidv4().split("-")[0],
			});

			// Reset submit button
			resetSubmitButton();
			setShow(false);

			// Navigate to the team's page
			navigate(`/teams/${team.id}`);
		} catch (e) {
			console.log("Error creating the team in DB.", e);

			// Reset submit button
			resetSubmitButton();
		}
	}

	return (
		<Overlay show={show}>
			<Modal title="Create team" setShow={setShow}>
				<form className="createTeamModal__form" onSubmit={createTeam}>
					<Modal.Body className="createTeamModal__form__inputs">
						<Input
							label="Name of the team"
							id="createTeamModalName"
							placeholder="Name of the team"
							required
							fullW
							ref={teamNameRef}
						/>

						<h4 className="createTeamModal__form__title">Info</h4>
						<ul className="createTeamModal__form__info">
							<li>You will be the admin of the team.</li>
							<li>You can add the members later.</li>
							<li>You can also set the rules of the team later.</li>
						</ul>
					</Modal.Body>

					<Modal.Footer>
						<Button type="button" variant="secondary" onClick={() => setShow(false)}>
							Cancel
						</Button>
						<Button type="submit" variant="accent" ref={submitButtonRef}>
							{loading ? "Loading..." : "Create"}
						</Button>
					</Modal.Footer>
				</form>
			</Modal>
		</Overlay>
	);
}

CreateTeamModal.propTypes = {
	show: PropTypes.bool.isRequired,
	setShow: PropTypes.func.isRequired,
};

export default CreateTeamModal;
