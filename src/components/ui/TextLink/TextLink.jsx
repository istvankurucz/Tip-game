import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./TextLink.css";

function TextLink({ to, replace, className, children }) {
	return (
		<Link
			to={to}
			replace={replace ?? false}
			className={`textLink${className ? ` ${className}` : ""}`}
		>
			{children}
		</Link>
	);
}

TextLink.propTypes = {
	to: PropTypes.string,
	replace: PropTypes.bool,
	className: PropTypes.string,
	children: PropTypes.node.isRequired,
};

export default TextLink;
