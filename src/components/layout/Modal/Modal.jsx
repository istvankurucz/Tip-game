import PropTypes from "prop-types";
import ModalFooter from "./ModalFooter";
import "./Modal.css";
import ModalMain from "./ModalMain";
import ModalHeader from "./ModalHeader";

function Modal({ setShow, title, className, children }) {
	return (
		<div className={`modal${className ? ` ${className}` : ""}`}>
			<Modal.Header setShow={setShow}>{title}</Modal.Header>

			{children}
		</div>
	);
}

Modal.propTypes = {
	setShow: PropTypes.func.isRequired,
	title: PropTypes.string,
	className: PropTypes.string,
	children: PropTypes.node.isRequired,
};

Modal.Header = ModalHeader;
Modal.Main = ModalMain;
Modal.Footer = ModalFooter;

export default Modal;
