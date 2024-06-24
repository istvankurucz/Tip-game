import PropTypes from "prop-types";
import "./ModalBody.css";

function ModalBody({ className, children }) {
	return <div className={`modalBody ${className ? ` ${className}` : ""}`}>{children}</div>;
}

ModalBody.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node.isRequired,
};

export default ModalBody;
