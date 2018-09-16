import { combineReducers } from 'redux';

import account from 'redux-modules/reducers/accountReducer';
import stock from 'redux-modules/reducers/stockReducer';
import referenceData from 'redux-modules/reducers/referenceDataReducer';

export default combineReducers({
    account,
    stock,
    referenceData
})