import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Section from "../../components/layout/Section/Section";
import Button from "../../components/ui/Button/Button";
import Subtitle from "../../components/ui/Subtitle/Subtitle";
import { useTeamContext } from "../../contexts/TeamContext";
import "./TeamSettings.css";
import {
	faArrowRightFromBracket,
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
import { useMemo, useState } from "react";
import useTeamMembers from "../../hooks/useTeamMembers";

function TeamSettings() {
	const [{ user }, dispatch] = useStateValue();
	const { team, isAdmin } = useTeamContext();
	const [adminListIndex, setAdminListIndex] = useState(0);
	const navigate = useNavigate();

	const memberIds = useMemo(() => {
		if (team == null || user == null) return [];
		return team.members.filter((member) => member.id !== user.uid).map((member) => member.id);
	}, [team, user]);
	const teamMembers = useTeamMembers(memberIds);

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
					<Section id="teamSettingsJoinCode" className="teamSettings__section">
						<Subtitle>Join code</Subtitle>

						<p className="teamSettings__p">
							Here is the code others can join to the team. You can regenerate the code
							anytime you want.
						</p>

						<div className="teamSettings__code">
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
					</Section>

					<Section id="teamSettingsAdmin" className="teamSettings__section">
						<Subtitle>Change admin</Subtitle>

						<p className="teamSettings__p">
							Watch out! After this operation you will lose your rights immediately.
						</p>

						<div className="teamSettings__admin">
							<Select
								id="teamSettingsAdminSelect"
								label="Choose a member"
								options={teamMembers?.map((member) => member.name)}
								index={adminListIndex}
								setIndex={setAdminListIndex}
							/>
							<Button onClick={changeAdmin}>
								<FontAwesomeIcon icon={faUserGear} />
								Change Admin
							</Button>
						</div>
					</Section>

					<Section id="teamSettingsDelete" className="teamSettings__section">
						<Subtitle>Delete team</Subtitle>

						<p className="teamSettings__p">Watch out! Deleting the team cannot be undone.</p>

						<Button
							variant="danger"
							outlined
							className="teamSettings__delete"
							onClick={deleteTeam}
						>
							<FontAwesomeIcon icon={faTrash} />
							Delete team
						</Button>
					</Section>
				</>
			) : (
				<Section id="teamSettingsLeave" className="teamSettings__section">
					<Subtitle>Leave team</Subtitle>

					<p className="teamSettings__p">By clicking the button you will leave the team.</p>

					<Button
						variant="danger"
						outlined
						className="teamSettings__leave"
						onClick={leaveTeam}
					>
						<FontAwesomeIcon icon={faArrowRightFromBracket} />
						Leave team
					</Button>
				</Section>
			)}
		</div>
	);
}

export default TeamSettings;
