/*
 *
 * ProfilePage actions
 *
 */

import {
  CHANGE_TIME_FRAME,
  SET_PORTFOLIO_VALUE,
  LOAD_BALANCE,
  LOAD_BALANCE_ERROR,
  LOAD_BALANCE_SUCCESS,
  LOAD_POSITIONS,
  LOAD_POSITIONS_ERROR,
  LOAD_POSITIONS_SUCCESS,
  LOAD_CHART,
  LOAD_CHART_ERROR,
  LOAD_CHART_SUCCESS,
} from './constants';

export function changeTimeFrame(timeFrame) {
  return {
    type: CHANGE_TIME_FRAME,
    timeFrame,
  };
}

export function setPortfolioValue(total) {
  return {
    type: SET_PORTFOLIO_VALUE,
    value: total,
  };
}

export function loadBalance() {
  return {
    type: LOAD_BALANCE,
  };
}

export function loadBalanceSuccess(balance) {
  return {
    type: LOAD_BALANCE_SUCCESS,
    balance,
  };
}

export function loadBalanceError(error) {
  return {
    type: LOAD_BALANCE_ERROR,
    error,
  };
}

export function loadPositions() {
  return {
    type: LOAD_POSITIONS,
  };
}

export function loadPositionsSuccess(positions) {
  return {
    type: LOAD_POSITIONS_SUCCESS,
    positions,
  };
}

export function loadPositionsError(error) {
  return {
    type: LOAD_POSITIONS_ERROR,
    error,
  };
}

export function loadChart() {
  return {
    type: LOAD_CHART,
  };
}

export function loadChartSuccess(chart) {
  return {
    type: LOAD_CHART_SUCCESS,
    chart,
  };
}

export function loadChartError(error) {
  return {
    type: LOAD_CHART_ERROR,
    error,
  };
}
