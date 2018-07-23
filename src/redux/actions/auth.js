import qs from 'query-string';
import axios from 'axios';

export function login (username, password) {
	return async (dispatch) => {
	  dispatch({type: "USER_LOGIN"});

	  try {
      const result = await axios({
        method: 'post',
        url: 'user/login',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: qs.stringify({
          username,
          password,
        }),
      });
      console.log(result.headers);
      dispatch({type: "USER_LOGIN_SUCCESS"}, {username, password});
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