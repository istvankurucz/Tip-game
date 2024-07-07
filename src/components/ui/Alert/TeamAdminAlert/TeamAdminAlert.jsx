import PropTypes from "prop-types";
import "./TeamAdminAlert.css";
import Alert from "../Alert";

function TeamAdminAlert({ className }) {
	return (
		<Alert variant="secondary" className={`teamAdminAlert${className ? ` ${className}` : ""}`}>
			<Alert.Header>Admin permissons needed!</Alert.Header>

			<Alert.Body>
				Only the admin of the team can access this page. Please contact the admin if you would
				like to change something sensitive in the team.
			</Alert.Body>
		</Alert>
	);
}

TeamAdminAlert.propTypes = {
	className: PropTypes.string,
};

export default TeamAdminAlert;
