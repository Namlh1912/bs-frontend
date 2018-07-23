import callApi from "./api"

export function login(username, password) {
	return dispatch => {
		callApi(dispatch, "USER_LOGIN", "/login", {
			method: "POST",
			body: {
				username,
				password
			}
		})
	}
}

export function logout() {
	return dispatch => {
		dispatch({
			type: "USER_LOGOUT_SUCCESS"
		})
	}
}