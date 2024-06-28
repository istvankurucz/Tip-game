import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../Button/Button";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { useRef } from "react";
import "./AlertHeader.css";

function AlertHeader({ children }) {
	const alertHeaderRef = useRef();

	// Function to close the alert
	function closeAlert() {
		const alert = alertHeaderRef.current.parentElement;
		alert.classList.remove("alert--show");
	}

	return (
		<header className="alertHeader" ref={alertHeaderRef}>
			<h3 className="alertHeader__title">{children}</h3>
			<Button
				variant="transparent"
				icon
				rounded
				className="alertHeader__close"
				onClick={closeAlert}
			>
				<FontAwesomeIcon icon={faClose} />
			</Button>
		</header>
	);
}

AlertHeader.propTypes = {
	variant: PropTypes.oneOf(["primary", "secondary", "accent"]),
	className: PropTypes.string,
	children: PropTypes.node.isRequired,
};

export default AlertHeader;
