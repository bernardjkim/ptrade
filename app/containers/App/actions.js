/*
 *
 * App actions
 *
 */

import {
  CREATE_SESSION,
  CREATE_SESSION_ERROR,
  CREATE_SESSION_SUCCESS,
} from './constants';

/**
 * Create session, this action starts the request saga
 *
 * @return {object} An action object with a type of CREATE_SESSION
 */
export function createSession() {
  return {
    type: CREATE_SESSION,
  };
}

/**
 * Dispatched when the session token is loaded by the request saga
 *
 * @param  {string} token The chart data
 *
 * @return {object}       An action object with a type of CREATE_SESSION_SUCCESS
 *                        passing the token
 */
export function createSessionSuccess(token) {
  return {
    type: CREATE_SESSION_SUCCESS,
    token,
  };
}

/**
 * Dispatched when createing the session fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of CREATE_SESSION_ERROR
 *                        passing the error
 */
export function createSessionError(error) {
  return {
    type: CREATE_SESSION_ERROR,
    error,
  };
}
