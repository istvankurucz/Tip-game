import { Link, useLocation } from "react-router-dom";
import "./TeamSidebar.css";

function TeamSidebar() {
	const location = useLocation();

	return (
		<div className="teamSidebar">
			<nav className="teamSidebar__nav">
				<h3 className="teamSidebar__title">Menu</h3>

				<ul className="teamSidebar__menu">
					<li
						className={`teamSidebar__menu__item${
							location.pathname.includes("ranking") ? " teamSidebar__menu__item--active" : ""
						}`}
					>
						<Link to="./ranking">Ranking</Link>
					</li>
					<li
						className={`teamSidebar__menu__item${
							location.pathname.includes("rules") ? " teamSidebar__menu__item--active" : ""
						}`}
					>
						<Link to="./rules">Rules</Link>
					</li>
					<li
						className={`teamSidebar__menu__item${
							location.pathname.includes("settings")
								? " teamSidebar__menu__item--active"
								: ""
						}`}
					>
						<Link to="./settigns">Settings</Link>
					</li>
				</ul>
			</nav>
		</div>
	);
}

export default TeamSidebar;
