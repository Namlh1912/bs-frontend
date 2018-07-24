import { combineReducers } from 'redux';
import auth from './auth';
import user from './user';
import book from './book';
import order from './order';

const rootReducer = combineReducers({
	me: auth,
	book: book,
	user: user,
	order: order,
});

export default rootReducer;