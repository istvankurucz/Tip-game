import { Link } from "react-router-dom";
import logo from "../../../../public/logo.png";
import "./Header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faAngleDown,
	faArrowRightFromBracket,
	faSignal,
	faUser,
	faUsers,
} from "@fortawesome/free-solid-svg-icons";

function Header() {
	return (
		<header className="header">
			<Link to="/" className="header__logo">
				<img src={logo} alt="Brand logo" className="header__logo_img" />
			</Link>

			<nav className="header__nav">
				<ul className="header__menu">
					<li className="header__menu__item">
						<Link to="/">Overview</Link>
					</li>
					<li className="header__menu__item">
						<Link to="/">My tips</Link>
					</li>
					<li className="header__menu__item">
						<Link to="/">Rankings</Link>
					</li>
					<li className="header__menu__item">
						<Link to="/">
							Profile <FontAwesomeIcon icon={faAngleDown} />
						</Link>

						<ul className="header__submenu header__submenu--profile">
							<li className="header__submenu__item">
								<Link to="/">
									<FontAwesomeIcon icon={faUser} /> Me
								</Link>
							</li>
							<li className="header__submenu__item">
								<Link to="/">
									<FontAwesomeIcon icon={faSignal} /> Stats
								</Link>
							</li>

							<hr className="header__submenu__divider" />

							<span className="header__submenu__title">
								<FontAwesomeIcon icon={faUsers} /> My teams
							</span>
							<li className="header__submenu__item">
								<Link to="/">Team 1</Link>
							</li>
							<li className="header__submenu__item">
								<Link to="/">Team 2</Link>
							</li>
							<li className="header__submenu__item">
								<Link to="/">Team 3</Link>
							</li>
							<li className="header__submenu__item">
								<Link to="/">and X more</Link>
							</li>

							<hr className="header__submenu__divider" />

							<li className="header__submenu__item">
								<Link to="/">
									<FontAwesomeIcon icon={faArrowRightFromBracket} /> Sign out
								</Link>
							</li>
						</ul>
					</li>
				</ul>
			</nav>
		</header>
	);
}

export default Header;
