import PropTypes from "prop-types";
import "./Overlay.css";

function Overlay({ show, className, children }) {
	return (
		<div className={`overlay ${show ? " overlay--show" : ""}${className ? ` ${className}` : ""}`}>
			{children}
		</div>
	);
}

Overlay.propTypes = {
	show: PropTypes.bool.isRequired,
	className: PropTypes.string,
	children: PropTypes.node.isRequired,
};

export default Overlay;
