/*
 *
 * Dashboard reducer
 *
 */

import { fromJS } from 'immutable';
import {
  CHANGE_SEARCH,
  CHANGE_TIME_FRAME,
  LOAD_STOCK_DATA,
  LOAD_STOCK_DATA_SUCCESS,
  LOAD_STOCK_DATA_ERROR,
} from './constants';

export const initialState = fromJS({
  search: false,
  timeFrame: 0,
  loading: false,
  error: false,
  stockData: false,
});

function dashboardReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_SEARCH:
      return state.set('search', action.search);
    case CHANGE_TIME_FRAME:
      return state.set('timeFrame', action.tf);
    case LOAD_STOCK_DATA:
      return state
        .set('loading', true)
        .set('error', false)
        .set('stockData', false);
    case LOAD_STOCK_DATA_SUCCESS:
      return state.set('stockData', action.data).set('loading', false);
    case LOAD_STOCK_DATA_ERROR:
      return state.set('error', action.error).set('loading', false);
    default:
      return state;
  }
}

export default dashboardReducer;
