import PropTypes from "prop-types";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import PageLoading from "./PageLoading";
import PageTitle from "../../ui/PageTitle/PageTitle";
import { useStateValue } from "../../../contexts/context API/StateProvider";
import PageBody from "./PageBody";
import "./Page.css";

function Page({ hasUserLoading, className, children }) {
	const [{ userLoading }] = useStateValue();

	return (
		<div className={`page${className ? ` ${className}` : ""}`}>
			{hasUserLoading && userLoading && <Page.Loading />}

			<Header />
			<main className="page__main">{children}</main>
			<Footer />
		</div>
	);
}

Page.propTypes = {
	hasUserLoading: PropTypes.bool,
	className: PropTypes.string,
	children: PropTypes.node.isRequired,
};

Page.Loading = PageLoading;
Page.Title = PageTitle;
Page.Body = PageBody;

export default Page;
