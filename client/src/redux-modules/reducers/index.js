import { combineReducers } from 'redux';

import account from 'redux-modules/reducers/accountReducer';
import stock from 'redux-modules/reducers/stockReducer';

export default combineReducers({
    account,
    stock,
})