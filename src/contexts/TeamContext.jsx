import PropTypes from "prop-types";
import { createContext, useContext } from "react";
import useTeam from "../hooks/useTeam";

export const TeamContext = createContext();

export default function TeamProvider({ children }) {
	const { team, isAdmin, loading } = useTeam();

	return (
		<TeamContext.Provider value={{ team, isAdmin, loading }}>{children}</TeamContext.Provider>
	);
}

// eslint-disable-next-line react-refresh/only-export-components
export const useTeamContext = () => useContext(TeamContext);

TeamProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
