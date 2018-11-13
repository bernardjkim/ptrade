/*
 *
 * ProfilePage actions
 *
 */

import {
  CHANGE_TIME_FRAME,
  LOAD_PORTFOLIO_VALUE,
  LOAD_PORTFOLIO_VALUE_ERROR,
  LOAD_PORTFOLIO_VALUE_SUCCESS,
} from './constants';

export function changeTimeFrame(timeFrame) {
  return {
    type: CHANGE_TIME_FRAME,
    timeFrame,
  };
}

export function loadPortfolioValue() {
  return {
    type: LOAD_PORTFOLIO_VALUE,
  };
}

export function portfolioValueSuccess(portfolioValue) {
  return {
    type: LOAD_PORTFOLIO_VALUE_SUCCESS,
    portfolioValue,
  };
}

export function portfolioValueError(error) {
  return {
    type: LOAD_PORTFOLIO_VALUE_ERROR,
    error,
  };
}
