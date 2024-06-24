import PropTypes from "prop-types";
import "./Subtitle.css";

function Subtitle({ className, children }) {
	return <h2 className={`subtitle${className ? ` ${className}` : ""}`}>{children}</h2>;
}

Subtitle.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node.isRequired,
};

export default Subtitle;
