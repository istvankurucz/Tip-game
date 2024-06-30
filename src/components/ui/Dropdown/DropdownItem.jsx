import PropTypes from "prop-types";
import "./DropdownItem.css";

function DropdownItem({ className, children }) {
	return <li className={`dropdownItem${className ? ` ${className}` : ""}`}>{children}</li>;
}

DropdownItem.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node.isRequired,
};

export default DropdownItem;
