import PropTypes from "prop-types";
import AlertHeader from "./AlertHeader";
import AlertBody from "./AlertBody";
import "./Alert.css";

function Alert({ variant = "primary", centered = true, className, children }) {
	return (
		<div
			className={`alert alert--show alert--${variant}${centered ? " alert--center" : ""}${
				className ? ` ${className}` : ""
			}`}
		>
			{children}
		</div>
	);
}

Alert.propTypes = {
	variant: PropTypes.oneOf(["primary", "secondary", "accent"]),
	centered: PropTypes.bool,
	className: PropTypes.string,
	children: PropTypes.node.isRequired,
};

Alert.Header = AlertHeader;
Alert.Body = AlertBody;

export default Alert;
