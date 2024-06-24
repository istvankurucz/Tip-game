import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./TextLink.css";

function TextLink({ to, className, children }) {
	return (
		<Link to={to} className={`textLink${className ? ` ${className}` : ""}`}>
			{children}
		</Link>
	);
}

TextLink.propTypes = {
	className: PropTypes.string,
	to: PropTypes.string,
	children: PropTypes.node.isRequired,
};

export default TextLink;
