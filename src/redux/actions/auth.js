import qs from 'query-string';
import axios from 'axios';

export function login (username, password) {
	return async dispatch => {
	  dispatch({type: "USER_LOGIN"});

	  try {
      const response = await axios({
        method: 'post',
        url: 'api/login',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: qs.stringify({
          username,
          password,
        }),
      });

			if (response.data.data.roleTitle != "admin") {
				dispatch({type: "USER_LOGIN_FAILURE"});
			} else {
				const result = {
					username,
					password,
					token: response.headers.authorization,
					data: response.data.data,
				}
				dispatch({type: "USER_LOGIN_SUCCESS", result});
			}
    } catch (e) {
      dispatch({type: "USER_LOGIN_FAILURE"});
    }
	}
}

export function logout() {
	return dispatch => {
		dispatch({
			type: "USER_LOGOUT_SUCCESS"
		})
	}
}