import store from 'store/dist/store.modern';

const INITIAL_STATE = {
	isLoading: false,
	token: store.get("token"),
	username: null,
	error: null
}

export default function authReducer(state = INITIAL_STATE, action) {
	// console.log(action.type)

	switch (action.type) {
		case "USER_LOGIN":
			return {
				...state,
				isLoading: true
			}

		case "USER_LOGIN_SUCCESS":
			const expires = new Date()
			expires.setDate(expires.getDate() + 1)
			store.set("token", action.result.token, {
				expires
			})
			return {
				...state,
				isLoading: false,
				token: action.result.token,
				username: action.result.username,
				error: null
			}

		case "USER_LOGIN_FAILURE":
			return {
				...state,
				isLoading: false,
				token: null,
				error: action.error,
				username: null
			}

		case "USER_LOGOUT_SUCCESS":
			store.remove("token")
			return {
				...state,
				isLoading: false,
				token: null,
				username: null,
				error: null
			}

		default:
			return state
	}
}