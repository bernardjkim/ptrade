/*
 *
 * ProfilePage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  CHANGE_TIME_FRAME,
  LOAD_BALANCE,
  LOAD_BALANCE_ERROR,
  LOAD_BALANCE_SUCCESS,
  LOAD_POSITIONS,
  LOAD_POSITIONS_SUCCESS,
  LOAD_POSITIONS_ERROR,
  LOAD_CHART_SUCCESS,
  LOAD_CHART_ERROR,
  LOAD_CHART,
  SET_PORTFOLIO_VALUE,
} from './constants';

export const initialState = fromJS({
  loading: false,
  error: false,
  balance: false,
  positions: false,
  chart: false,
  portfolioValue: false,
  timeFrame: 0,
});

function profilePageReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_TIME_FRAME:
      return state.set('timeFrame', action.timeFrame);

    case SET_PORTFOLIO_VALUE:
      return state.set('portfolioValue', action.value);

    case LOAD_BALANCE:
      return state.set('loading', true).set('error', false);
    case LOAD_BALANCE_SUCCESS:
      return state.set('loading', false).set('balance', action.balance);
    case LOAD_BALANCE_ERROR:
      return state.set('loading', false).set('error', action.error);

    case LOAD_POSITIONS:
      return state.set('loading', true).set('error', false);
    case LOAD_POSITIONS_SUCCESS:
      return state.set('loading', false).set('positions', action.positions);
    case LOAD_POSITIONS_ERROR:
      return state.set('loading', false).set('error', action.error);

    case LOAD_CHART:
      return state.set('loading', true).set('error', false);
    case LOAD_CHART_SUCCESS:
      return state.set('loading', false).set('chart', action.chart);
    case LOAD_CHART_ERROR:
      return state.set('loading', false).set('error', action.error);

    default:
      return state;
  }
}

export default profilePageReducer;
