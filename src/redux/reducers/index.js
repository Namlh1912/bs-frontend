import { combineReducers } from 'redux';
import auth from './auth';
import user from './user';
import book from './book';

const rootReducer = combineReducers({
	me: auth,
	book: book,
	user: user,
});

export default rootReducer;