const INITIAL_STATE = {
	isLoading: false,
	list: [],
	current: null,
}

export default function UserReducer(state = INITIAL_STATE, action) {
	// console.log(action.type)

	switch (action.type) {
		case "USER_DETAIL":
		case "USER_LIST":
			return {
				...state,
				current: null,
				isLoading: true
			}

		case "USER_LIST_SUCCESS":
			return {
				...state,
				isLoading: false,
				list: action.result.data,
			}

		case "USER_DETAIL_SUCCESS":
			return {
				...state,
				isLoading: false,
				current: action.result.data,
			}

		case "USER_LIST_FAILURE":
		case "USER_DETAIL_FAILURE":
			return {
				...state,
				isLoading: false,
			}

		default:
			return state
	}
}