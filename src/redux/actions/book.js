import axios from 'axios';
import { push } from 'connected-react-router';

export function list () {
	return async dispatch => {
		dispatch({type: "BOOK_LIST"});

		try {
			const response = await axios({
				method: 'get',
				url: 'api/admin/book/list?page=1',
			});

			if (response.data.data) {
				const result = {
					data: response.data.data,
				}
				dispatch({type: "BOOK_LIST_SUCCESS", result});
			} else {
				dispatch({type: "BOOK_LIST_FAILURE"});
			}
		} catch (e) {
			dispatch({type: "BOOK_LIST_FAILURE"});
		}
	}
}

export function create (data) {
	return async dispatch => {
		dispatch({type: "BOOK_CREATE"});

		try {
			const response = await axios({
				method: 'post',
				url: 'api/admin/book',
				headers: {
					'Content-Type': 'application/json',
				},
				data
			});

			if (response.data.data) {
				dispatch({type: "BOOK_CREATE_SUCCESS"});
				dispatch(push('/books'));
			} else {
				dispatch({type: "BOOK_CREATE_FAILURE"});
			}
		} catch (e) {
			dispatch({type: "BOOK_CREATE_FAILURE"});
		}
	}
}

export function update (id, data) {
	return async dispatch => {
		dispatch({type: "BOOK_UPDATE"});

		try {
			const response = await axios({
				method: 'put',
				url: `api/admin/book/${id}`,
				headers: {
					'Content-Type': 'application/json',
				},
				data
			});

			if (response.data.data) {
				dispatch({type: "BOOK_UPDATE_SUCCESS"});
				dispatch(push('/books'));
			} else {
				dispatch({type: "BOOK_UPDATE_FAILURE"});
			}
		} catch (e) {
			dispatch({type: "BOOK_UPDATE_FAILURE"});
		}
	}
}

export function detail (id) {
	return async dispatch => {
		dispatch({type: "BOOK_DETAIL"});

		try {
			const response = await axios({
				method: 'get',
				url: `api/admin/book/${id}`,
			});

			if (response.data.data) {
				const result = {
					data: response.data.data,
				}
				dispatch({type: "BOOK_DETAIL_SUCCESS", result});
			} else {
				dispatch({type: "BOOK_CREATE_FAILURE"});
			}
		} catch (e) {
			dispatch({type: "BOOK_CREATE_FAILURE"});
		}
	}
}

export function remove (id, reload = false) {
	return async dispatch => {
		dispatch({type: "BOOK_DELETE"});

		try {
			const response = await axios({
				method: 'delete',
				url: `api/admin/book/${id}`,
			});

			if (response.data.data) {
				dispatch({type: "BOOK_DELETE_SUCCESS"});
				if (reload) {
					dispatch(list());
				} else {
					dispatch(push('/books'));
				}
			} else {
				dispatch({type: "BOOK_DELETE_FAILURE"});
			}
		} catch (e) {
			dispatch({type: "BOOK_DELETE_FAILURE"});
		}
	}
}