import { combineReducers } from 'redux';
import auth from './auth';

const rootReducer = combineReducers({
	me: auth,
});

export default rootReducer;