/*
 *
 * Dashboard actions
 *
 */

import {
  LOAD_STOCK_DATA,
  LOAD_STOCK_DATA_SUCCESS,
  LOAD_STOCK_DATA_ERROR,
  CHANGE_SEARCH,
} from './constants';

export function changeSearch(search) {
  return {
    type: CHANGE_SEARCH,
    search,
  };
}

/**
 * Load stock data, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_STOCK_DATA
 */
export function loadStockData() {
  return {
    type: LOAD_STOCK_DATA,
  };
}

/**
 * Dispatched when the stock data is loaded by the request saga
 *
 * @param  {array} data The stock data
 *
 * @return {object}      An action object with a type of LOAD_STOCK_DATA_SUCCESS passing the repos
 */
export function stockDataLoaded(data, symbol) {
  return {
    type: LOAD_STOCK_DATA_SUCCESS,
    data,
    symbol,
  };
}

/**
 * Dispatched when loading the stock data fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_STOCK_DATA_ERROR passing the error
 */
export function stockDataLoadingError(error) {
  return {
    type: LOAD_STOCK_DATA_ERROR,
    error,
  };
}
