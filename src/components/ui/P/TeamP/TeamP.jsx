import PropTypes from "prop-types";
import "./TeamP.css";

function TeamP({ className, children }) {
	return <p className={`teamP${className ? ` ${className}` : ""}`}>{children}</p>;
}

TeamP.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node.isRequired,
};

export default TeamP;
