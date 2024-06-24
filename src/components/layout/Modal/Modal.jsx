import PropTypes from "prop-types";
import ModalHeader from "./ModalHeader";
import ModalBody from "./ModalBody";
import ModalFooter from "./ModalFooter";
import "./Modal.css";

function Modal({ setShow, title, className, children }) {
	return (
		<div className={`modal${className ? ` ${className}` : ""}`}>
			<Modal.Header setShow={setShow}>{title}</Modal.Header>

			{children}
		</div>
	);
}

Modal.propTypes = {
	setShow: PropTypes.func,
	title: PropTypes.string,
	className: PropTypes.string,
	children: PropTypes.node.isRequired,
};

Modal.Header = ModalHeader;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;

export default Modal;
