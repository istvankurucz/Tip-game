import { forwardRef } from "react";
import PropTypes from "prop-types";
import "./Input.css";

const Input = forwardRef(
	({ type = "text", id, label, direction = "vertical", fullW, className, ...rest }, ref) => {
		return (
			<div
				className={`input input--${direction}${fullW ? " input--full" : ""}${
					className ? ` ${className}` : ""
				}`}
			>
				<label htmlFor={id} className="input__label">
					{label}
					{rest?.required && <span className="input__required">*</span>}
				</label>
				<input type={type} id={id} ref={ref} className="input__input" {...rest} />
			</div>
		);
	}
);

Input.displayName = "Input";

Input.propTypes = {
	type: PropTypes.string,
	id: PropTypes.string.isRequired,
	label: PropTypes.string,
	direction: PropTypes.oneOf(["vertical", "horizontal"]),
	fullW: PropTypes.bool,
	className: PropTypes.string,
};

export default Input;
