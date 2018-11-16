/*
 *
 * Dashboard reducer
 *
 */

import { fromJS } from 'immutable';
import {
  CHANGE_SEARCH,
  CHANGE_TIME_FRAME,
  SELECT_SYMBOL,
  LOAD_CHART,
  LOAD_CHART_SUCCESS,
  LOAD_CHART_ERROR,
  LOAD_QUOTE,
  LOAD_QUOTE_SUCCESS,
  LOAD_QUOTE_ERROR,
} from './constants';

export const initialState = fromJS({
  loading: false,
  error: false,
  search: false,
  symbol: false,
  timeFrame: 0,
  chart: false,
  quote: false,
});

function dashboardReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_SEARCH:
      return state.set('search', action.search);
    case SELECT_SYMBOL:
      return state.set('symbol', action.symbol);
    case CHANGE_TIME_FRAME:
      return state.set('timeFrame', action.tf);

    case LOAD_CHART:
      return state.set('loading', true).set('error', false);
    case LOAD_CHART_SUCCESS:
      return state.set('chart', action.chart).set('loading', false);
    case LOAD_CHART_ERROR:
      return state.set('error', action.error).set('loading', false);

    case LOAD_QUOTE:
      return state.set('loading', true).set('error', false);
    case LOAD_QUOTE_SUCCESS:
      return state.set('quote', action.quote).set('loading', false);
    case LOAD_QUOTE_ERROR:
      return state.set('error', action.error).set('loading', false);

    default:
      return state;
  }
}

export default dashboardReducer;
