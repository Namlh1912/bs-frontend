const INITIAL_STATE = {
	isLoading: false,
	list: [],
	current: null,
}

export default function bookReducer(state = INITIAL_STATE, action) {
	// console.log(action.type)

	switch (action.type) {
		case "BOOK_DELETE":
		case "BOOK_UPDATE":
		case "BOOK_DETAIL":
		case "BOOK_CREATE":
		case "BOOK_LIST":
			return {
				...state,
				current: null,
				isLoading: true,
			}

		case "BOOK_LIST_SUCCESS":
			return {
				...state,
				isLoading: false,
				list: action.result.data,
			}

		case "BOOK_DELETE_SUCCESS":
		case "BOOK_UPDATE_SUCCESS":
		case "BOOK_CREATE_SUCCESS":
			return {
				...state,
				isLoading: false,
			}


		case "BOOK_DETAIL_SUCCESS":
			return {
				...state,
				isLoading: false,
				current: action.result.data,
			}

		case "BOOK_DELETE_FAILURE":
		case "BOOK_DETAIL_FAILURE":
		case "BOOK_UPDATE_FAILURE":
		case "BOOK_LIST_FAILURE":
		case "BOOK_CREATE_FAILURE":
			return {
				...state,
				isLoading: false,
			}

		default:
			return state
	}
}