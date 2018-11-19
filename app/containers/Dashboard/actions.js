/*
 *
 * Dashboard actions
 *
 */

import {
  CHANGE_SEARCH,
  CHANGE_TIME_FRAME,
  CHANGE_QUANTITY,
  SELECT_SYMBOL,
  LOAD_CHART,
  LOAD_CHART_SUCCESS,
  LOAD_CHART_ERROR,
  LOAD_QUOTE,
  LOAD_QUOTE_SUCCESS,
  LOAD_QUOTE_ERROR,
  REQUEST_TRADE,
  REQUEST_TRADE_ERROR,
  REQUEST_TRADE_SUCCESS,
} from './constants';

/**
 * Change the current search symbol
 *
 * @param  {string} search  A stock symbol
 *
 * @return {object}         An action object with a type of CHANGE_SEARCH
 */
export function changeSearch(search) {
  return {
    type: CHANGE_SEARCH,
    search,
  };
}

/**
 * Change the current selected symbol
 *
 * @param  {string} symbol  Stock symbol
 *
 * @return {object}         An action object with a type of SELECT_SYMBOL
 */
export function selectSymbol(symbol) {
  return {
    type: SELECT_SYMBOL,
    symbol,
  };
}

/**
 * Change the selected time frame
 *
 * @param  {number} tf  Time frame index
 *
 * @return {object}     An action object with a type of CHANGE_TIME_FRAME
 */
export function changeTimeFrame(tf) {
  return {
    type: CHANGE_TIME_FRAME,
    tf,
  };
}

/**
 * Change the trade quantity
 *
 * @param  {number} quantity  The desired quantity to be traded
 *
 * @return {object}           An action object with a type of CHANGE_QUANTITY
 */
export function changeTradeQuantity(quantity) {
  return {
    type: CHANGE_QUANTITY,
    quantity,
  };
}

/**
 * Load chart, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_CHART
 */
export function loadChart() {
  return {
    type: LOAD_CHART,
  };
}

/**
 * Dispatched when the chart is loaded by the request saga
 *
 * @param  {array} chart  The chart data
 *
 * @return {object}       An action object with a type of LOAD_CHART_SUCCESS passing the data
 */
export function chartLoaded(chart) {
  return {
    type: LOAD_CHART_SUCCESS,
    chart,
  };
}

/**
 * Dispatched when loading the chart fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_CHART_ERROR passing the error
 */
export function chartLoadingError(error) {
  return {
    type: LOAD_CHART_ERROR,
    error,
  };
}

/**
 * Load the stock quote, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_QUOTE
 */
export function loadQuote() {
  return {
    type: LOAD_QUOTE,
  };
}

/**
 * Dispatched when the stock quote is loaded by the request saga
 *
 * @param  {object} quote The stock quote
 *
 * @return {object}       An action object with a type of LOAD_QUOTE_SUCCESS passing the quote
 */
export function quoteLoaded(quote) {
  return {
    type: LOAD_QUOTE_SUCCESS,
    quote,
  };
}

/**
 * Dispatched when loading the stock quote fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_QUOTE_ERROR passing the error
 */
export function quoteLoadingError(error) {
  return {
    type: LOAD_QUOTE_ERROR,
    error,
  };
}

/**
 * Request trade, this action starts the request saga
 *
 * @return {object} An action object with a type of REQUEST_TRADE
 */
export function requestTrade() {
  return {
    type: REQUEST_TRADE,
  };
}

/**
 * Dispatched when an acknowledgement has been received by the request saga
 *
 * @return {object} An action object with a type of REQUEST_TRADE_SUCCESS
 */
export function requestTradeSuccess() {
  return {
    type: REQUEST_TRADE_SUCCESS,
  };
}

/**
 * Dispatched when an error has been received in response by the request saga
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of REQUEST_TRADE_ERROR
 */
export function requestTradeError(error) {
  return {
    type: REQUEST_TRADE_ERROR,
    error,
  };
}
