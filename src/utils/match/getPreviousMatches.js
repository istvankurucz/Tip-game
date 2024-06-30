export default function getPreviousMatches(matches = [], limit = null) {
	const now = new Date();

	const previous = matches.filter((match) => now > new Date(match.time) && match.finished);

	if (limit == null) return previous.toReversed();
	return previous.toReversed().slice(0, limit);
}
