import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopyright } from "@fortawesome/free-regular-svg-icons";
import Container from "../Container/Container";
import "./Footer.css";

function Footer() {
	return (
		<footer className="footer">
			<Container centered>
				<p className="footer__copyright">
					<span className="footer__brand">Tip game</span>.{" "}
					<FontAwesomeIcon icon={faCopyright} /> Every rights reserved. 2024
				</p>
			</Container>
		</footer>
	);
}

export default Footer;
