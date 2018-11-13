/*
 *
 * ProfilePage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  CHANGE_TIME_FRAME,
  LOAD_PORTFOLIO_VALUE,
  LOAD_PORTFOLIO_VALUE_ERROR,
  LOAD_PORTFOLIO_VALUE_SUCCESS,
} from './constants';

export const initialState = fromJS({
  loading: false,
  error: false,
  portfolioValue: false,
  timeFrame: 0,
});

function profilePageReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_TIME_FRAME:
      return state.set('timeFrame', action.timeFrame);

    case LOAD_PORTFOLIO_VALUE:
      return state.set('loading', true).set('error', false);
    case LOAD_PORTFOLIO_VALUE_SUCCESS:
      return state
        .set('loading', false)
        .set('portfolioValue', action.portfolioValue);
    case LOAD_PORTFOLIO_VALUE_ERROR:
      return state.set('loading', false).set('error', action.error);
    default:
      return state;
  }
}

export default profilePageReducer;
