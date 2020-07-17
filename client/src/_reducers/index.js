import { combineReducers } from 'redux';
import user from './user_reducer';
import sns from './sns_reducer';
import shop from './shop_reducer'
const rootReducer = combineReducers({
	user,
	sns,
	shop,
});

export default rootReducer;
