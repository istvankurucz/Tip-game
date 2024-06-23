import { forwardRef } from "react";
import PropTypes from "prop-types";
import "./Checkbox.css";

const Checkbox = forwardRef(({ id, label, className }, ref) => {
	function handleKeyDown(e) {
		if (!id) return;

		if (e.code === "Space" || e.code === "Enter" || e.code === "NumpadEnter") {
			const input = document.getElementById(id);
			input.checked = !input.checked;
		}
	}

	return (
		<label
			htmlFor={id}
			tabIndex={0}
			className={`checkbox${className ? ` ${className}` : ""}`}
			onKeyDown={handleKeyDown}
		>
			<input type="checkbox" id={id} ref={ref} hidden className="checkbox__input" />
			<span className="checkbox__marker"></span>
			<span className="checkbox__label">{label}</span>
		</label>
	);
});

Checkbox.displayName = "Checkbox";

Checkbox.propTypes = {
	id: PropTypes.string,
	label: PropTypes.string,
	className: PropTypes.string,
};

export default Checkbox;
