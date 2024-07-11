import { tournaments } from "../assets/tournaments/tournaments";
import { useStateValue } from "../contexts/context API/StateProvider";

function useActiveTournament() {
	const [{ user }] = useStateValue();

	if (user == null) return null;
	return tournaments.get(user.activeTournament);
}

export default useActiveTournament;
