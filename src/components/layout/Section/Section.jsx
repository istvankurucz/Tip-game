import PropTypes from "prop-types";
import "./Section.css";
import Container from "../Container/Container";

function Section({ id, py = "2rem", className, children }) {
	return (
		<section
			id={id}
			style={{ "--py": py }}
			className={`section${className ? ` ${className}` : ""}`}
		>
			<Container centered>{children}</Container>
		</section>
	);
}

Section.propTypes = {
	id: PropTypes.string.isRequired,
	py: PropTypes.string,
	className: PropTypes.string,
	children: PropTypes.node.isRequired,
};

export default Section;
