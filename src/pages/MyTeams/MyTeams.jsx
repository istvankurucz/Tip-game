import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Page from "../../components/layout/Page/Page";
import Section from "../../components/layout/Section/Section";
import { faPlus, faSort, faUserPlus, faUsersSlash } from "@fortawesome/free-solid-svg-icons";
import Button from "../../components/ui/Button/Button";
import TextLink from "../../components/ui/TextLink/TextLink";
import { useState } from "react";
import CreateTeamModal from "./CreateTeamModal";
import "./MyTeams.css";
import useUserTeams from "../../hooks/useUserTeams";
import Subtitle from "../../components/ui/Subtitle/Subtitle";
import { Link } from "react-router-dom";
import Table from "../../components/layout/Table/Table";

function MyTeams() {
	const { teams, loading } = useUserTeams();
	const [sort, setSort] = useState({ property: "name", asc: true });
	const [showCreateTeamModal, setShowCreateTeamModal] = useState(false);

	const sortedTeams = sortTeams(teams, sort.property, sort.asc);

	const hasUserTeams = teams.length !== 0;

	// Function to update the params of the sorting
	function setSortParams(newProperty) {
		setSort((prev) => {
			if (prev.property === newProperty) return { property: newProperty, asc: !prev.asc };
			else return { property: newProperty, asc: true };
		});
	}

	// Function to perform the sorting on teams array
	function sortTeams(teams, property, asc = true) {
		function byName(a, b) {
			if (asc) return a.name > b.name ? 1 : a.name < b.name ? -1 : 0;
			else return a.name < b.name ? 1 : a.name > b.name ? -1 : 0;
		}

		function byMembers(a, b) {
			if (asc) return a.members.length - b.members.length;
			else return b.members.length - a.members.length;
		}

		switch (property) {
			case "name": {
				return teams.sort((a, b) => byName(a, b));
			}
			case "members": {
				return teams.sort((a, b) => byMembers(a, b));
			}
			default: {
				return teams;
			}
		}
	}

	const newTeamButtons = (
		<div className="myTeams__noTeam__buttons">
			<Button>
				<FontAwesomeIcon icon={faUserPlus} />
				Join team
			</Button>
			<Button onClick={() => setShowCreateTeamModal(true)}>
				<FontAwesomeIcon icon={faPlus} />
				Create team
			</Button>
		</div>
	);

	return (
		<Page hasUserLoading>
			<CreateTeamModal show={showCreateTeamModal} setShow={setShowCreateTeamModal} />

			{loading && <Page.Loading text="Getting your teams..." />}

			<Page.Title>Teams</Page.Title>

			<Page.Body userNeeded>
				{!hasUserTeams && !loading && (
					<Section id="myTeamsNoTeam" className="myTeams__noTeam">
						<FontAwesomeIcon icon={faUsersSlash} className="myTeams__noTeam__icon" />

						<p className="myTeams__p">
							It looks like you are not a member of any teams. <br />
							Click on the button below to join a team or create your own!
						</p>

						{newTeamButtons}

						<div className="myTeams__p">
							In the meantime you can still check your position in the{" "}
							<TextLink to="/ranking">global ranking</TextLink>.
						</div>
					</Section>
				)}

				<Section id="myTeamsList">
					<Subtitle>My teams</Subtitle>

					<Table sortable className="myTeams__table myTeams__table--teams">
						<tr>
							<th onClick={() => setSortParams("name")}>
								Team name
								<FontAwesomeIcon icon={faSort} className="th__sortIcon" />
							</th>
							<th onClick={() => setSortParams("members")}>
								Members
								<FontAwesomeIcon icon={faSort} className="th__sortIcon" />
							</th>
						</tr>
						{sortedTeams.map((team) => (
							<tr key={team.id}>
								<td>
									<Link to={`/teams/${team.id}`}>{team.name}</Link>
								</td>
								<td>{team.members.length}</td>
							</tr>
						))}
					</Table>
				</Section>

				<Section variant="secondary" id="myTeamsNewTeam">
					<Subtitle>New team</Subtitle>

					<p className="myTeams__p">
						Click on the button below to join a team or create your own!
					</p>
					{newTeamButtons}
				</Section>
			</Page.Body>
		</Page>
	);
}

export default MyTeams;
