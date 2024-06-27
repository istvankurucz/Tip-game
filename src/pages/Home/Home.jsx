import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../components/ui/Button/Button";
import "./Home.css";
import {
	faChartLine,
	faFutbol,
	faPenToSquare,
	faRankingStar,
	faShareNodes,
	faUser,
	faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import Section from "../../components/layout/Section/Section";
import Page from "../../components/layout/Page/Page";

function Home() {
	return (
		<Page>
			<Section py="3rem" id="homeIntro" className="home__section--intro">
				<h1 className="home__title">
					Welcome to <span className="home__brand">Tip game</span>!
				</h1>

				<p className="home__p">
					Try out the most <span className="home__highlight">enjoyable</span> tip game you have
					ever seen!
				</p>
				<p className="home__p">
					Play with your friends, colleagues, family and everyone for the glory to become the
					best tip player of the event!
				</p>
				<p className="home__p">
					You only to <span className="home__highlight">create an account</span> and you are
					ready to compete with others in this tournament. <br />
					You can also <span className="home__highlight">create private groups</span> to
					compete directly with your friends in a custom rule system.
				</p>
				<p className="home__p">Click on the button below to create an account!</p>

				<Link to="/signup" className="home__intro__signup">
					<Button centered tabIndex={-1}>
						<FontAwesomeIcon icon={faUser} /> Create account
					</Button>
				</Link>

				<div className="home__section__footballs">
					<FontAwesomeIcon
						icon={faFutbol}
						className="home__intro__football home__intro__football--1"
					/>
					<FontAwesomeIcon
						icon={faFutbol}
						className="home__intro__football home__intro__football--2"
					/>
					<FontAwesomeIcon
						icon={faFutbol}
						className="home__intro__football home__intro__football--3"
					/>
				</div>
			</Section>

			<Section py="3rem" id="homeWorkflow" className="home__section--workflow">
				<h2 className="home__subtitle">
					Everything you need to know about <span className="home__brand">Tip game</span>!
				</h2>

				<p className="home__p">
					Tip game is all about tipping. We made a really{" "}
					<span className="home__highlight">easy to understand system</span> to take care about
					everything in seconds!
				</p>
				<p className="home__p">With this game you are able to:</p>
				<ol className="home__list home__list--features">
					<li data-list-number="1." className="home__list__item">
						Tip for every match easier than ever.
					</li>
					<li data-list-number="2." className="home__list__item">
						Change your tips until the match starts.
					</li>
					<li data-list-number="3." className="home__list__item">
						Watch the tips of the others after the match started.
					</li>
					<li data-list-number="+1" className="home__list__item">
						Watch the stats of your tips.
					</li>
				</ol>

				<div className="home__workflow__graphics">
					<FontAwesomeIcon
						icon={faChartLine}
						className="home__workflow__graphics__icon home__workflow__graphics__icon--chart"
					/>
					<FontAwesomeIcon
						icon={faFutbol}
						className="home__workflow__graphics__icon home__workflow__graphics__icon--football"
					/>
					<FontAwesomeIcon
						icon={faShareNodes}
						className="home__workflow__graphics__icon home__workflow__graphics__icon--share"
					/>
				</div>
			</Section>

			<Section py="3rem" id="homeUsage" className="home__section--usage">
				<h2 className="home__subtitle">
					How to use <span className="home__brand">Tip game</span>?
				</h2>

				<p className="home__p">
					It is really easy to get started. Here are the steps to{" "}
					<span className="home__highlight">become the master</span> of{" "}
					<span className="home__brad">Tip game</span>.
				</p>
				<ol className="home__list home__list--usage">
					<li data-list-number="1." className="home__list__item">
						First you need to <Link className="home__link">create an account</Link>.
					</li>
					<li data-list-number="2." className="home__list__item">
						Navigate to <Link className="home__link">My tips</Link> page where you can make
						your tips.
					</li>
					<li data-list-number="3." className="home__list__item">
						Create a group with your friends on the{" "}
						<Link className="home__link">My teams</Link> page.
					</li>
					<li data-list-number="4." className="home__list__item">
						Change the rules inside the group to your liking.
					</li>
					<li data-list-number="5." className="home__list__item">
						Go to <Link className="home__link">Rankings</Link> page and track your position on
						the table.
					</li>
					<li data-list-number="+1" className="home__list__item">
						Good luck for the tipping!
					</li>
				</ol>

				<div className="home__usage__graphics">
					<FontAwesomeIcon
						icon={faUsers}
						className="home__usage__graphics__icon home__usage__graphics__icon--users"
					/>
					<FontAwesomeIcon
						icon={faPenToSquare}
						className="home__usage__graphics__icon home__usage__graphics__icon--write"
					/>
					<FontAwesomeIcon
						icon={faRankingStar}
						className="home__usage__graphics__icon home__usage__graphics__icon--rankings"
					/>
				</div>
			</Section>
		</Page>
	);
}

export default Home;
