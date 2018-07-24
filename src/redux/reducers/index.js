import { combineReducers } from 'redux';
import auth from './auth';
import book from './book';

const rootReducer = combineReducers({
	me: auth,
	book: book,
});

export default rootReducer;