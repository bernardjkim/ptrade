/*
 *
 * Dashboard actions
 *
 */

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
