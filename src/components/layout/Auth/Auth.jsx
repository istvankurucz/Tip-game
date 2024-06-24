import PropTypes from "prop-types";
import AuthBody from "./AuthBody";
import AuthText from "./AuthText";
import "./Auth.css";

function Auth({ className, children }) {
	return <div className={`auth${className ? ` ${className}` : ""}`}>{children}</div>;
}

Auth.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node.isRequired,
};

Auth.Body = AuthBody;
Auth.Text = AuthText;

export default Auth;
