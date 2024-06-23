import PropTypes from "prop-types";
import "./Button.css";
import { forwardRef } from "react";

const Button = forwardRef(
	(
		{
			type = "button",
			variant = "accent",
			outlined,
			rounded,
			icon,
			className,
			children,
			...rest
		},
		ref
	) => {
		return (
			<button
				type={type}
				className={`button${variant ? ` button--${variant}` : ""}${
					outlined ? " button--outlined" : ""
				}${rounded ? " button--rounded" : ""}${icon ? " button--icon" : ""}${
					className ? ` ${className}` : ""
				}`}
				ref={ref}
				{...rest}
			>
				{children}
			</button>
		);
	}
);

Button.displayName = "Button";

Button.propTypes = {
	type: PropTypes.string,
	variant: PropTypes.oneOf(["primary", "secondary", "accent", "danger", "link"]),
	outlined: PropTypes.bool,
	rounded: PropTypes.bool,
	icon: PropTypes.bool,
	className: PropTypes.string,
	children: PropTypes.node.isRequired,
};

export default Button;
