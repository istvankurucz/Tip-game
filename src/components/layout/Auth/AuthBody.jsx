import PropTypes from "prop-types";
import "./AuthBody.css";
import Modal from "../Modal/Modal";

function AuthBody({ className, children }) {
	return (
		<Modal.Body className={`authBody${className ? ` ${className}` : ""}`}>{children}</Modal.Body>
	);
}

AuthBody.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node.isRequired,
};

export default AuthBody;
