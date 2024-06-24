import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../ui/Button/Button";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import "./ModalHeader.css";

function ModalHeader({ setShow, children }) {
	return (
		<header className="modalHeader">
			<h2 className="modalHeader__title">{children}</h2>
			{setShow != null && (
				<Button variant="primary" icon rounded onClick={() => setShow(false)}>
					<FontAwesomeIcon icon={faClose} />
				</Button>
			)}
		</header>
	);
}

ModalHeader.propTypes = {
	setShow: PropTypes.func,
	children: PropTypes.node.isRequired,
};

export default ModalHeader;
