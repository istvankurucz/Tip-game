import PropTypes from "prop-types";
import Alert from "../Alert";
import "./SignInAlert.css";
import Button from "../../Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";

function SignInAlert({ className }) {
	return (
		<Alert variant="secondary" className={className}>
			<Alert.Header>You are not signed in.</Alert.Header>

			<Alert.Body>
				<p className="signInAlert__p">Click on the button below to sign in.</p>
				<Link to="/signin" className="signInAlert__link">
					<Button>
						<FontAwesomeIcon icon={faUser} />
						Sign In
					</Button>
				</Link>
			</Alert.Body>
		</Alert>
	);
}

SignInAlert.propTypes = {
	className: PropTypes.string,
};

export default SignInAlert;
