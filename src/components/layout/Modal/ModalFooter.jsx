import PropTypes from "prop-types";
import "./ModalFooter.css";

function ModalFooter({ children }) {
	return <footer className="modalFooter">{children}</footer>;
}

ModalFooter.propTypes = {
	children: PropTypes.node.isRequired,
};

export default ModalFooter;
