import PropTypes from "prop-types";
import "./ModalMain.css";

function ModalMain({ children }) {
	return <div className="modalMain">{children}</div>;
}

ModalMain.propTypes = {
	children: PropTypes.node.isRequired,
};

export default ModalMain;
