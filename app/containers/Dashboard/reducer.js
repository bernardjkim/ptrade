/*
 *
 * Dashboard reducer
 *
 */

import { fromJS } from 'immutable';
import {
  CHANGE_SEARCH,
  LOAD_STOCK_DATA,
  LOAD_STOCK_DATA_SUCCESS,
  LOAD_STOCK_DATA_ERROR,
} from './constants';

export const initialState = fromJS({
  loading: false,
  error: false,
  search: '',
  stockData: false,
  currentSymbol: false,
});

function dashboardReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_SEARCH:
      return state.set('search', action.search);
    case LOAD_STOCK_DATA:
      return state
        .set('loading', true)
        .set('error', false)
        .set('stockData', false);
    case LOAD_STOCK_DATA_SUCCESS:
      return state
        .setIn('stockData', action.data)
        .set('loading', false)
        .set('currentSymbol', action.symbol);
    case LOAD_STOCK_DATA_ERROR:
      return state.set('error', action.error).set('loading', false);
    default:
      return state;
  }
}

export default dashboardReducer;
