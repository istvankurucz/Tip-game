import PropTypes from "prop-types";
import "./PageBody.css";
import { useStateValue } from "../../../contexts/context API/StateProvider";
import SignInAlert from "../../ui/Alert/SignInAlert/SignInAlert";

function PageBody({ userNeeded, className, children }) {
	const [{ user, userLoading }] = useStateValue();

	const showSignInAlert = userLoading === false && user == null;

	return (
		<div className={`pageBody${className ? ` ${className}` : ""}`}>
			{userNeeded && showSignInAlert ? <SignInAlert /> : children}
		</div>
	);
}

PageBody.propTypes = {
	userNeeded: PropTypes.bool,
	className: PropTypes.string,
	children: PropTypes.node.isRequired,
};

export default PageBody;
