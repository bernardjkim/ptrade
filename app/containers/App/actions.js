/*
 *
 * App actions
 *
 */

import {
  LOAD_TOKEN,
  CREATE_SESSION,
  CREATE_SESSION_ERROR,
  CREATE_SESSION_SUCCESS,
  DELETE_SESSION,
} from './constants';

/**
 * Load current jwt token if available
 *
 * @return {object} An action object with a type of LOAD_TOKEN
 *
 */
export function loadToken() {
  const token = sessionStorage.getItem('jwtToken');
  return {
    type: LOAD_TOKEN,
    token,
  };
}

/**
 * Delete the current session token
 *
 * @return {object} An action object with a type of DELETE_TOKEN
 *
 */
export function deleteSession() {
  sessionStorage.removeItem('jwtToken');
  return {
    type: DELETE_SESSION,
  };
}

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
