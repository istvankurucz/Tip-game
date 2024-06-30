// Object that describes how many points should be give for every tip-result combination
export const generalRules = {
	// the user didn't make a tip
	noTip: {
		points: 0,
		colorVariant: "danger",
	},
	// the user hit the winner of the match
	result: {
		points: 1,
		colorVariant: "warning",
	},
	// the user hit the exact result of the match
	exactResult: {
		points: 3,
		colorVariant: "success",
	},
};
