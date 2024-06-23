import { Link } from "react-router-dom";
import logo from "../../../../public/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faAngleDown,
	faArrowRightFromBracket,
	faBars,
	faSignal,
	faUser,
	faUsers,
} from "@fortawesome/free-solid-svg-icons";
import Container from "../Container/Container";
import Button from "../../ui/Button/Button";
import "./Header.css";
import { useEffect, useState } from "react";

function Header() {
	const [showMenu, setShowMenu] = useState(window.innerWidth >= 576);
	const [showProfileSubmenu, setShowProfileSubmenu] = useState(window.innerWidth >= 576);

	// Show/hide the menu based on the screen size
	useEffect(() => {
		function handleResize() {
			setShowMenu(window.innerWidth >= 576);
			setShowProfileSubmenu(window.innerWidth >= 576);
		}

		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	return (
		<header className="header">
			<Container className="header__container" centered>
				<Link to="/" className="header__logo">
					<img src={logo} alt="Brand logo" className="header__logo__img" />
				</Link>

				<nav className="header__nav">
					{showMenu && (
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
							<li className="header__menu__item header__menu__item--more">
								<Link to="/" onClick={() => setShowProfileSubmenu((prev) => !prev)}>
									Profile <FontAwesomeIcon icon={faAngleDown} />
								</Link>

								{showProfileSubmenu && (
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

										<li className="header__submenu__item header__submenu__item--danger">
											<Link to="/">
												<FontAwesomeIcon icon={faArrowRightFromBracket} /> Sign out
											</Link>
										</li>
									</ul>
								)}
							</li>
						</ul>
					)}

					<Button
						variant="secondary"
						outlined
						icon
						className="header__menu__hamburger"
						onClick={() => setShowMenu((prev) => !prev)}
					>
						<FontAwesomeIcon icon={faBars} />
					</Button>
				</nav>
			</Container>
		</header>
	);
}

export default Header;
