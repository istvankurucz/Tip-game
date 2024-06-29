import PropTypes from "prop-types";
import "./Spinner.css";

function Spinner({ size = "3rem", centered = true, text = "Loading...", className }) {
	return (
		<div
			style={{ "--size": size }}
			className={`spinner${centered ? " spinner--centered" : ""}${
				className ? ` ${className}` : ""
			}`}
		>
			<div className="spinner__circles">
				<span className="spinner__circle"></span>
				<span className="spinner__circle"></span>
				<span className="spinner__circle"></span>
				<span className="spinner__circle"></span>
				<span className="spinner__circle"></span>
				<span className="spinner__circle"></span>
			</div>

			<p className="spinner__text">{text}</p>
		</div>
	);
}

Spinner.propTypes = {
	size: PropTypes.string,
	centered: PropTypes.bool,
	text: PropTypes.string,
	className: PropTypes.string,
};

export default Spinner;
