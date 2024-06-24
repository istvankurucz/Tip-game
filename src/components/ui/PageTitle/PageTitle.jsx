import PropTypes from "prop-types";
import "./PageTitle.css";

function PageTitle({ className, children }) {
	return <h1 className={`pageTitle${className ? ` ${className}` : ""}`}>{children}</h1>;
}

PageTitle.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node.isRequired,
};

export default PageTitle;
