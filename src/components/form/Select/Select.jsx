import PropTypes from "prop-types";
import "./Select.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { forwardRef, useRef } from "react";

const Select = forwardRef(({ label, options, index, setIndex, id, className }, ref) => {
	const optionsRef = useRef();

	return (
		<div className={`select${className ? ` ${className}` : ""}`}>
			<input
				className="select__input"
				id={id}
				hidden
				value={options[index]}
				readOnly
				ref={ref}
			/>
			<div className="select__label">{label}</div>
			<button
				type="button"
				className="select__button"
				onClick={() => optionsRef.current.classList.toggle("select__options--show")}
				onBlur={() =>
					setTimeout(() => optionsRef.current.classList.remove("select__options--show"), 100)
				}
			>
				<span title={options[index]} className="select__button__selected">
					{options[index]}
				</span>
				<FontAwesomeIcon icon={faAngleDown} />
			</button>

			<ul className="select__options" ref={optionsRef}>
				{options.map((option, i) => (
					<li
						key={i}
						title={option}
						className={`select__option${index === i ? " select__option--selected" : ""}`}
						onClick={() => setIndex(i)}
					>
						{option}
					</li>
				))}
			</ul>
		</div>
	);
});

Select.displayName = "Select";

Select.propTypes = {
	label: PropTypes.string,
	options: PropTypes.array.isRequired,
	index: PropTypes.number.isRequired,
	setIndex: PropTypes.func.isRequired,
	id: PropTypes.string.isRequired,
	className: PropTypes.string,
};

export default Select;
