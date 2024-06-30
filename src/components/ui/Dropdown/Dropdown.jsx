import PropTypes from "prop-types";
import DropdownItem from "./DropdownItem";
import "./Dropdown.css";

function Dropdown({ show, className, children }) {
	return (
		<ul className={`dropdown${show ? " dropdown--show" : ""}${className ? ` ${className}` : ""}`}>
			{children}
		</ul>
	);
}

Dropdown.propTypes = {
	show: PropTypes.bool.isRequired,
	className: PropTypes.string,
	children: PropTypes.node.isRequired,
};

Dropdown.Item = DropdownItem;

export default Dropdown;
