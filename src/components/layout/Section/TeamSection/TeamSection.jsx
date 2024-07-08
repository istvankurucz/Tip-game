import PropTypes from "prop-types";
import Section from "../Section";
import "./TeamSection.css";

function TeamSection({ id, className, children }) {
	return (
		<Section id={id} className={`teamSection${className ? ` ${className}` : ""}`}>
			{children}
		</Section>
	);
}

TeamSection.propTypes = {
	id: PropTypes.string.isRequired,
	className: PropTypes.string,
	children: PropTypes.node.isRequired,
};

export default TeamSection;
