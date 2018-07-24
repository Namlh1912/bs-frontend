const INITIAL_STATE = {
	isLoading: false,
	list: [],
	current: null,
}

export default function OrderReducer(state = INITIAL_STATE, action) {
	switch (action.type) {
		case "ORDER_DETAIL":
		case "ORDER_LIST":
			return {
				...state,
				current: null,
				isLoading: true
			}

		case "ORDER_LIST_SUCCESS":
			return {
				...state,
				isLoading: false,
				list: action.result.data,
			}

		case "ORDER_DETAIL_SUCCESS":
			return {
				...state,
				isLoading: false,
				current: action.result.data,
			}

		case "ORDER_LIST_FAILURE":
		case "ORDER_DETAIL_FAILURE":
			return {
				...state,
				isLoading: false,
			}

		default:
			return state
	}
}