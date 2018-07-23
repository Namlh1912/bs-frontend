import thunk from 'redux-thunk';
import promise from 'redux-promise';
import { compose, applyMiddleware, createStore } from 'redux';

import reducers from '../redux/reducers/index';

export default function configureStore(initialState = {}) {
	const store = createStore(
		reducers,
		initialState,
		compose(applyMiddleware(
			thunk,
			promise,
		)),
	);

	global.store = store;
	return store;
}