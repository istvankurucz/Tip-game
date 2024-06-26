import PropTypes from "prop-types";
import "./Select.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { forwardRef, useEffect, useRef, useState } from "react";

const Select = forwardRef(({ label, options, index, setIndex, id, className }, ref) => {
	const optionsRef = useRef();
	const [hoveredIndex, setHoveredIndex] = useState(index);

	// Function that hides the options and resets the hover index
	function handleSelectButtonBlur() {
		setHoveredIndex(index);
		setTimeout(() => optionsRef.current.classList.remove("select__options--show"), 100);
	}

	useEffect(() => {
		// Navigate through the options with keyboard and select the option with Enter
		function handleSelectKeyNav(e) {
			// Check if the select options are open or not
			const isOptionsOpen = optionsRef.current.classList.contains("select__options");
			if (!isOptionsOpen) return;

			// Set new selected item with Space or Enter
			if (e.code === "Enter" || e.code === "NumpadEnter" || e.code === "Space") {
				setIndex(hoveredIndex);
			}
			// Navigate with arrow keys
			if (e.code === "ArrowDown" || e.code === "ArrowRight") {
				setHoveredIndex((prev) => {
					if (prev === options.length - 1) return prev;
					else return prev + 1;
				});
			}
			if (e.code === "ArrowUp" || e.code === "ArrowLeft") {
				setHoveredIndex((prev) => {
					if (prev === 0) return prev;
					else return prev - 1;
				});
			}
		}

		window.addEventListener("keydown", handleSelectKeyNav);

		return () => window.removeEventListener("keydown", handleSelectKeyNav);
	}, [hoveredIndex, options.length, setIndex]);

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
				onBlur={handleSelectButtonBlur}
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
						className={`select__option${index === i ? " select__option--selected" : ""}${
							hoveredIndex != null && hoveredIndex === i ? " select__option--hover" : ""
						}`}
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
