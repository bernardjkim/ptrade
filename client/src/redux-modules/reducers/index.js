import { combineReducers } from 'redux';

import account from './accountReducer';
import stock from './stockReducer';

export default combineReducers({
    account,
    stock,
})