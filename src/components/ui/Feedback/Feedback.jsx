import PropTypes from "prop-types";
import { useStateValue } from "../../../contexts/context API/StateProvider";
import Button from "../Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import "./Feedback.css";
import { useCallback, useEffect } from "react";

function Feedback({ time = 10, className }) {
	const [{ feedback }, dispatch] = useStateValue();

	// Function to hide the feedback and reset its values
	const closeFeedback = useCallback(() => {
		// Slide up the component
		dispatch({
			type: "SET_FEEDBACK",
			feedback: {
				...feedback,
				show: false,
			},
		});

		// After it has disappeared reset its values
		setTimeout(() => {
			dispatch({
				type: "SET_FEEDBACK",
				feedback: {
					show: false,
					type: "",
					message: "",
					details: "",
				},
			});
		}, 200);
	}, [dispatch, feedback]);

	// useEffect to automatically close the feedback after a certain time
	useEffect(() => {
		if (feedback.show) {
			const timer = setTimeout(closeFeedback, time * 1000);

			return () => clearTimeout(timer);
		}
	}, [closeFeedback, feedback.show, time]);

	const closeButtonVariant =
		feedback.type === "success" ? "accent" : feedback.type === "error" ? "danger" : "primary";

	return (
		<div
			className={`feedback feedback--${feedback.type}${feedback.show ? " feedback--show" : ""}${
				className ? ` ${className}` : ""
			}`}
		>
			<header className="feedback__header">
				<h3 className="feedback__title">{feedback.message}</h3>
				<Button
					variant={closeButtonVariant}
					icon
					rounded
					className="feedback__close"
					onClick={closeFeedback}
				>
					<FontAwesomeIcon icon={faClose} />
				</Button>
			</header>

			{feedback.details !== "" && (
				<>
					<hr className="feedback__divider" />
					<p className="feedback__body">{feedback.details}</p>
				</>
			)}
		</div>
	);
}

Feedback.propTypes = {
	time: PropTypes.number,
	className: PropTypes.string,
};

export default Feedback;
