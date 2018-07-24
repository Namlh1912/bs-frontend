import store from 'store/dist/store.modern';

const INITIAL_STATE = {
	loading: false,
	list: [],
}

export default function bookReducer(state = INITIAL_STATE, action) {
	// console.log(action.type)

	switch (action.type) {
		case "BOOK_CREATE":
		case "BOOK_LIST":
			return {
				...state,
				loading: true
			}

		case "BOOK_LIST_SUCCESS":
			return {
				...state,
				loading: false,
				list: action.result.data,
			}

		case "BOOK_LIST_FAILURE":
			return {
				...state,
				loading: false,
				list: [],
			}

		default:
			return state
	}
}