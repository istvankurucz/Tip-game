import PropTypes from "prop-types";
import "./AlertBody.css";

function AlertBody({ children }) {
	return <div className="alertBody">{children}</div>;
}

AlertBody.propTypes = {
	children: PropTypes.node.isRequired,
};

export default AlertBody;
