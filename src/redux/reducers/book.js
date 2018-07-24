const INITIAL_STATE = {
	loading: false,
	list: [],
	current: null,
}

export default function bookReducer(state = INITIAL_STATE, action) {
	// console.log(action.type)

	switch (action.type) {
		case "BOOK_DETAIL":
		case "BOOK_CREATE":
		case "BOOK_LIST":
			return {
				...state,
				current: null,
				loading: true
			}

		case "BOOK_LIST_SUCCESS":
			return {
				...state,
				loading: false,
				list: action.result.data,
			}

		case "BOOK_DELETE_SUCCESS":
		case "BOOK_UPDATE_SUCCESS":
		case "BOOK_CREATE_SUCCESS":
			return {
				...state,
				loading: false,
			}


		case "BOOK_DETAIL_SUCCESS":
			return {
				...state,
				loading: false,
				current: action.result.data,
			}

		case "BOOK_DELETE_FAILURE":
		case "BOOK_UPDATE_FAILURE":
		case "BOOK_LIST_FAILURE":
		case "BOOK_CREATE_FAILURE":
			return {
				...state,
				loading: false,
			}

		default:
			return state
	}
}