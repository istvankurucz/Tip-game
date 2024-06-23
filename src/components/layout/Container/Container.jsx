import PropTypes from "prop-types";
import "./Container.css";

function Container({ maxWidth = "1200px", centered, className, children }) {
	return (
		<div
			style={{ "--maxWidth": maxWidth }}
			className={`container${centered ? " container--centered" : ""}${
				className ? ` ${className}` : ""
			}`}
		>
			{children}
		</div>
	);
}

Container.propTypes = {
	maxWidth: PropTypes.string,
	className: PropTypes.string,
	centered: PropTypes.bool,
	children: PropTypes.node.isRequired,
};

export default Container;
