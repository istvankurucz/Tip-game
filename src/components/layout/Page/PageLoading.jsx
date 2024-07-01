import PropTypes from "prop-types";
import Spinner from "../../ui/Spinner/Spinner";
import "./PageLoading.css";

function PageLoading({ text, className }) {
	return (
		<div className={`pageLoading${className ? ` ${className}` : ""}`}>
			<Spinner text={text} />
		</div>
	);
}

PageLoading.propTypes = {
	text: PropTypes.string,
	className: PropTypes.string,
};

export default PageLoading;
