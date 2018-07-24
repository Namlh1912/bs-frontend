import thunk from 'redux-thunk';
import promise from 'redux-promise';
import { compose, applyMiddleware, createStore } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';

import reducers from '../redux/reducers/index';

export default function configureStore(history) {
	const store = createStore(
		connectRouter(history)(reducers),
		{},
		compose(applyMiddleware(
			thunk,
			promise,
			routerMiddleware(history),
		)),
	);

	return store;
}