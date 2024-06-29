import PropTypes from "prop-types";
import Spinner from "../../ui/Spinner/Spinner";
import "./PageLoading.css";

function PageLoading({ className }) {
	return (
		<div className={`pageLoading${className ? ` ${className}` : ""}`}>
			<Spinner />
		</div>
	);
}

PageLoading.propTypes = {
	className: PropTypes.string,
};

export default PageLoading;
