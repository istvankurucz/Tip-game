import PropTypes from "prop-types";
import "./PageBody.css";
import { useStateValue } from "../../../contexts/context API/StateProvider";
import SignInAlert from "../../ui/Alert/SignInAlert/SignInAlert";

function PageBody({ userNeeded, children }) {
	const [{ user, userLoading }] = useStateValue();

	const showSignInAlert = userLoading === false && user == null;

	if (userNeeded && showSignInAlert) return <SignInAlert className="pageBody__alert" />;
	return children;
}

PageBody.propTypes = {
	userNeeded: PropTypes.bool,
	children: PropTypes.node.isRequired,
};

export default PageBody;
