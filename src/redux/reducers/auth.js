import store from 'store/dist/store.modern';

const INITIAL_STATE = {
  loading: false,
	token: store.get("token"),
	username: store.get("me") ? store.get("me").username : null,
	error: null
}

export default function authReducer(state = INITIAL_STATE, action) {
	// console.log(action.type)

	switch (action.type) {
		case "USER_LOGIN":
			return {
				...state,
				loading: true
			}

		case "USER_LOGIN_SUCCESS":
			const expires = new Date()
			expires.setDate(expires.getDate() + 1)
			store.set("token", action.result.token);
			store.set("me", action.result.data);
			return {
				...state,
        loading: false,
				token: action.result.token,
				username: action.result.data.username,
				error: null
			}

		case "USER_LOGIN_FAILURE":
			return {
				...state,
        loading: false,
				token: null,
				error: action.error,
				username: null
			}

		case "USER_LOGOUT_SUCCESS":
			store.remove("token");
			store.remove("me");
			return {
				...state,
        loading: false,
				token: null,
				username: null,
				error: null
			}

		default:
			return state
	}
}