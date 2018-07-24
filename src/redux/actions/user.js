import axios from 'axios';

export function list () {
	return async dispatch => {
		dispatch({type: "USER_LIST"});

		try {
			const response = await axios({
				method: 'get',
				url: 'api/admin/user/list?page=1',
			});

			if (response.data.data) {
				const result = {
					data: response.data.data,
				}
				dispatch({type: "USER_LIST_SUCCESS", result});
			} else {
				dispatch({type: "USER_LIST_FAILURE"});
			}
		} catch (e) {
			dispatch({type: "USER_LIST_FAILURE"});
		}
	}
}

export function detail (id) {
	return async dispatch => {
		dispatch({type: "USER_DETAIL"});

		try {
			const response = await axios({
				method: 'get',
				url: `api/admin/user/${id}`,
			});

			if (response.data.data) {
				const result = {
					data: response.data.data,
				}
				dispatch({type: "USER_DETAIL_SUCCESS", result});
			} else {
				dispatch({type: "USER_DETAIL_FAILURE"});
			}
		} catch (e) {
			dispatch({type: "USER_DETAIL_FAILURE"});
		}
	}
}
