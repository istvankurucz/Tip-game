import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../components/ui/Button/Button";
import Subtitle from "../../components/ui/Subtitle/Subtitle";
import { useTeamContext } from "../../contexts/TeamContext";
import Team from "./Team";
import {
	faArrowRightFromBracket,
	faCheck,
	faHashtag,
	faRotate,
	faTrash,
	faUserGear,
} from "@fortawesome/free-solid-svg-icons";
import { useStateValue } from "../../contexts/context API/StateProvider";
import { v4 as uuidv4 } from "uuid";
import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import Select from "../../components/form/Select/Select";
import { useMemo, useRef, useState } from "react";
import useTeamMembers from "../../hooks/useTeamMembers";
import "./TeamSettings.css";
import Input from "../../components/form/Input/Input";

function TeamSettings() {
	const [{ user }, dispatch] = useStateValue();
	const { team, isAdmin } = useTeamContext();
	const [adminListIndex, setAdminListIndex] = useState(0);
	const navigate = useNavigate();

	const teamNameRef = useRef();

	const memberIds = useMemo(() => {
		if (team == null || user == null) return [];
		return team.members.filter((member) => member.id !== user.uid).map((member) => member.id);
	}, [team, user]);
	const teamMembers = useTeamMembers(memberIds);

	async function saveTeamName() {
		// Get the new name
		const teamName = teamNameRef.current.value.trim();

		// Check if the new name has a values
		if (teamName === "") {
			dispatch({
				type: "SET_FEEDBACK",
				feedback: {
					show: true,
					type: "error",
					message: "Please enter the new name of the team.",
					details: "",
				},
			});
			return;
		}

		// Check if the new name is actually new
		if (teamName === team.name) {
			dispatch({
				type: "SET_FEEDBACK",
				feedback: {
					show: true,
					type: "success",
					message: "Team name saved.",
					details: "",
				},
			});
			return;
		}

		// Update the name in the DB
		try {
			const teamRef = doc(db, "teams", team.id);
			await updateDoc(teamRef, {
				name: teamName,
			});

			dispatch({
				type: "SET_FEEDBACK",
				feedback: {
					show: true,
					type: "success",
					message: "Team name saved.",
					details: "",
				},
			});
		} catch (e) {
			console.log("Error sving the new name of the team.", e);
		}
	}

	// Function to copy the join code of the team to clipboard
	function copyCodeToClipboard() {
		navigator.clipboard.writeText(team.joinCode);

		dispatch({
			type: "SET_FEEDBACK",
			feedback: {
				show: true,
				type: "info",
				message: "Join code copied to clipboard.",
				details: "",
			},
		});
	}

	// Function to create a new join code
	async function regenerateJoinCode() {
		const newCode = uuidv4().split("-")[0];

		try {
			const teamRef = doc(db, "teams", team.id);
			await updateDoc(teamRef, {
				joinCode: newCode,
			});

			dispatch({
				type: "SET_FEEDBACK",
				feedback: {
					show: true,
					type: "success",
					message: "Join code successfully generated.",
					details: "",
				},
			});
		} catch (e) {
			console.log("Error saving the new join code.", e);
		}
	}

	// Function to change the admin of the team
	async function changeAdmin() {
		const confirm = window.confirm("Are you sure you want to change the admin rights?");
		if (!confirm) return;

		const newAdmin = teamMembers[adminListIndex];

		const newRoles = team.roles.map((member) => {
			if (member.member.id === newAdmin.id) return { ...member, role: "admin" };
			if (member.member.id === user.uid) return { ...member, role: "player" };
			return member;
		});

		try {
			const teamRef = doc(db, "teams", team.id);
			await updateDoc(teamRef, {
				roles: newRoles,
			});

			dispatch({
				type: "SET_FEEDBACK",
				feedback: {
					show: true,
					type: "success",
					message: "Admin rights changed successfully.",
					details: "",
				},
			});
			navigate("../ranking");
		} catch (e) {
			console.log("Error changing the admin.", e);
		}
	}

	// Function to delete the team
	async function deleteTeam() {
		const confirm = window.confirm(
			"Are you sure you want to delete the team? This action cannot be undone."
		);
		if (!confirm) return;

		try {
			const teamRef = doc(db, "teams", team.id);
			await deleteDoc(teamRef);

			dispatch({
				type: "SET_FEEDBACK",
				feedback: {
					show: true,
					type: "success",
					message: "Team has been deleted successfully.",
					details: "",
				},
			});
			navigate("/myteams");
		} catch (e) {
			console.log("Error deleting the team.", e);
		}
	}

	// Function to leave from the tem
	async function leaveTeam() {
		const confirm = window.confirm("Are you sure you want to leave the team?");
		if (!confirm) return;

		try {
			const teamRef = doc(db, "teams", team.id);
			const userRef = doc(db, "users", user.uid);
			await updateDoc(teamRef, {
				members: arrayRemove(userRef),
				roles: arrayRemove({ member: userRef, role: "player" }),
			});

			dispatch({
				type: "SET_FEEDBACK",
				feedback: {
					show: true,
					type: "success",
					message: "You successfully left the team.",
					details: "",
				},
			});
			navigate("/myteams");
		} catch (e) {
			console.log("Error removing the user from the team.", e);
		}
	}

	return (
		<div className="teamSettings">
			{isAdmin ? (
				<>
					<Team.Section id="teamSettingsName">
						<Subtitle>Team name</Subtitle>

						<Team.P>Here you can change the name of the team.</Team.P>

						<div className="teamSettings__flex teamSettings__flex--name">
							<Input
								id="teamSettingsNameInput"
								label="Team name"
								placeholder="Team name"
								defaultValue={team?.name}
								ref={teamNameRef}
							/>
							<Button onClick={saveTeamName}>
								<FontAwesomeIcon icon={faCheck} />
								Save
							</Button>
						</div>
					</Team.Section>

					<Team.Section id="teamSettingsJoinCode">
						<Subtitle>Join code</Subtitle>

						<Team.P>
							Here is the code others can join to the team. You can regenerate the code
							anytime you want.
						</Team.P>

						<div className="teamSettings__flex teamSettings__flex--code">
							<Button
								variant="secondary"
								title="Copy join code"
								onClick={copyCodeToClipboard}
							>
								<FontAwesomeIcon icon={faHashtag} />
								{team?.joinCode}
							</Button>
							<Button onClick={regenerateJoinCode}>
								<FontAwesomeIcon icon={faRotate} />
								Regenerate
							</Button>
						</div>
					</Team.Section>

					<Team.Section id="teamSettingsAdmin">
						<Subtitle>Change admin</Subtitle>

						<Team.P>
							Watch out! After this operation you will lose your rights immediately.
						</Team.P>

						<div className="teamSettings__flex teamSettings__flex--admin">
							<Select
								id="teamSettingsAdminSelect"
								label="Choose a member"
								className="teamSettings__admin__select"
								options={teamMembers?.map((member) => member.name)}
								index={adminListIndex}
								setIndex={setAdminListIndex}
							/>
							<Button onClick={changeAdmin} className="teamSettings__admin__save">
								<FontAwesomeIcon icon={faUserGear} />
								Change Admin
							</Button>
						</div>
					</Team.Section>

					<Team.Section id="teamSettingsDelete">
						<Subtitle>Delete team</Subtitle>

						<Team.P>Watch out! Deleting the team cannot be undone.</Team.P>

						<Button
							variant="danger"
							outlined
							className="teamSettings__delete"
							onClick={deleteTeam}
						>
							<FontAwesomeIcon icon={faTrash} />
							Delete team
						</Button>
					</Team.Section>
				</>
			) : (
				<Team.Section id="teamSettingsLeave">
					<Subtitle>Leave team</Subtitle>

					<Team.P>By clicking the button you will leave the team.</Team.P>

					<Button
						variant="danger"
						outlined
						className="teamSettings__leave"
						onClick={leaveTeam}
					>
						<FontAwesomeIcon icon={faArrowRightFromBracket} />
						Leave team
					</Button>
				</Team.Section>
			)}
		</div>
	);
}

export default TeamSettings;
