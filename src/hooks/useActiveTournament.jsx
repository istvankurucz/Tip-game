import { tournaments } from "../assets/tournaments/tournaments";
import { useStateValue } from "../contexts/context API/StateProvider";

function useActiveTournament() {
	const [{ user }] = useStateValue();

	return tournaments.get(user?.activeTournament);
}

export default useActiveTournament;
