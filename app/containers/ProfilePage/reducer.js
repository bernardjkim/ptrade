/*
 *
 * ProfilePage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  CHANGE_TIME_FRAME,
  CHANGE_TRANSFER_AMOUNT,
  LOAD_BALANCE,
  LOAD_BALANCE_ERROR,
  LOAD_BALANCE_SUCCESS,
  LOAD_POSITIONS,
  LOAD_POSITIONS_SUCCESS,
  LOAD_POSITIONS_ERROR,
  LOAD_CHART_SUCCESS,
  LOAD_CHART_ERROR,
  LOAD_CHART,
  REQUEST_TRANSFER,
  REQUEST_TRANSFER_ERROR,
  REQUEST_TRANSFER_SUCCESS,
} from './constants';

export const initialState = fromJS({
  loading: false,
  error: false,
  balance: false,
  positions: false,
  chart: false,
  totalInvested: false,
  timeFrame: 0,
  transferAmount: 0,
});

function profilePageReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_TIME_FRAME:
      return state.set('timeFrame', action.timeFrame);
    case CHANGE_TRANSFER_AMOUNT:
      return state.set('transferAmount', action.amount);

    case LOAD_BALANCE:
      return state.set('loading', true).set('error', false);
    case LOAD_BALANCE_SUCCESS:
      return state.set('loading', false).set('balance', action.balance);
    case LOAD_BALANCE_ERROR:
      return state.set('loading', false).set('error', action.error);

    case LOAD_POSITIONS:
      return state.set('loading', true).set('error', false);
    case LOAD_POSITIONS_SUCCESS:
      return state
        .set('loading', false)
        .set('positions', action.positions)
        .set('totalInvested', action.total);
    case LOAD_POSITIONS_ERROR:
      return state.set('loading', false).set('error', action.error);

    case LOAD_CHART:
      return state.set('loading', true).set('error', false);
    case LOAD_CHART_SUCCESS:
      return state.set('loading', false).set('chart', action.chart);
    case LOAD_CHART_ERROR:
      return state.set('loading', false).set('error', action.error);

    case REQUEST_TRANSFER:
      return state.set('loading', true).set('error', false);
    case REQUEST_TRANSFER_SUCCESS:
      return state.set('loading', false);
    case REQUEST_TRANSFER_ERROR:
      return state.set('loading', false).set('error', false);

    default:
      return state;
  }
}

export default profilePageReducer;
