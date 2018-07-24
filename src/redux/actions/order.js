import axios from 'axios';

export function list () {
	return async dispatch => {
		dispatch({type: "ORDER_LIST"});

		try {
			const response = await axios({
				method: 'get',
				url: 'api/admin/orders/list?page=1',
			});

			if (response.data.data) {
				const result = {
					data: response.data.data,
				}
				dispatch({type: "ORDER_LIST_SUCCESS", result});
			} else {
				dispatch({type: "ORDER_LIST_FAILURE"});
			}
		} catch (e) {
			dispatch({type: "ORDER_LIST_FAILURE"});
		}
	}
}

export function detail (id) {
	return async dispatch => {
		dispatch({type: "ORDER_DETAIL"});

		try {
			const response = await axios({
				method: 'get',
				url: `api/admin/orders/${id}`,
			});

			if (response.data.data) {
				const result = {
					data: response.data.data,
				}
				dispatch({type: "ORDER_DETAIL_SUCCESS", result});
			} else {
				dispatch({type: "ORDER_DETAIL_FAILURE"});
			}
		} catch (e) {
			dispatch({type: "ORDER_DETAIL_FAILURE"});
		}
	}
}
