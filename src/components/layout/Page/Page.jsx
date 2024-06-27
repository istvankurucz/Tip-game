import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import "./Page.css";
import PropTypes from "prop-types";

function Page({ className, children }) {
	return (
		<div className={`page${className ? ` ${className}` : ""}`}>
			<Header />
			<main className="page__main">{children}</main>
			<Footer />
		</div>
	);
}

Page.propTypes = {
	className: PropTypes.string,
	children: PropTypes.node.isRequired,
};

export default Page;
