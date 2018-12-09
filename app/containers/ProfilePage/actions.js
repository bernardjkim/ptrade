/*
 *
 * ProfilePage actions
 *
 */

import {
  CHANGE_TIME_FRAME,
  CHANGE_TRANSFER_AMOUNT,
  LOAD_BALANCE,
  LOAD_BALANCE_ERROR,
  LOAD_BALANCE_SUCCESS,
  LOAD_POSITIONS,
  LOAD_POSITIONS_ERROR,
  LOAD_POSITIONS_SUCCESS,
  LOAD_CHART,
  LOAD_CHART_ERROR,
  LOAD_CHART_SUCCESS,
  REQUEST_TRANSFER,
  REQUEST_TRANSFER_ERROR,
  REQUEST_TRANSFER_SUCCESS,
} from './constants';

export function changeTimeFrame(timeFrame) {
  return {
    type: CHANGE_TIME_FRAME,
    timeFrame,
  };
}

export function changeTransferAmount(amount) {
  return {
    type: CHANGE_TRANSFER_AMOUNT,
    amount,
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
  let total = 0;
  positions.forEach(p => {
    total += p.shares * p.price_per_share;
  });
  return {
    type: LOAD_POSITIONS_SUCCESS,
    positions,
    total,
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

export function requestTransfer() {
  return {
    type: REQUEST_TRANSFER,
  };
}

export function requestTransferSuccess() {
  return {
    type: REQUEST_TRANSFER_SUCCESS,
  };
}

export function requestTransferError(error) {
  return {
    type: REQUEST_TRANSFER_ERROR,
    error,
  };
}
