export const initialState = {
	user: null,
	userLoading: true,
	feedback: {
		show: false,
		type: "",
		message: "",
		details: "",
	},
};

export default function reducer(state, action) {
	switch (action.type) {
		case "SET_USER":
			return {
				...state,
				user: action.user,
			};

		case "SET_USER_LOADING":
			return {
				...state,
				userLoading: action.userLoading,
			};

		case "SET_FEEDBACK":
			return {
				...state,
				feedback: action.feedback,
			};

		default:
			return "Invalid action type!";
	}
}
