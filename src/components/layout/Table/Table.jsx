import PropTypes from "prop-types";
import "./Table.css";

function Table({ sortable, className, children }) {
	return (
		<table
			className={`table${sortable ? " table--sortable" : ""}${className ? ` ${className}` : ""}`}
		>
			{children}
		</table>
	);
}

Table.propTypes = {
	sortable: PropTypes.bool,
	className: PropTypes.string,
	children: PropTypes.node.isRequired,
};

export default Table;
