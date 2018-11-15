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
  let token = sessionStorage.getItem('jwtToken');
  if (!token) token = false;

  return {
    type: LOAD_TOKEN,
    token,
  };
}

/**
 * Delete the current session token
 * TODO: want to black list jwt on server-side as well?
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
 * @param  {string} email     User email
 * @param  {string} password  User password
 *
 * @return {object}           An action object with a type of CREATE_SESSION
 */
export function createSession(email, password) {
  return {
    type: CREATE_SESSION,
    email,
    password,
  };
}

/**
 * Dispatched when the session token is loaded by the request saga
 *
 * @return {object} An action object with a type of CREATE_SESSION_SUCCESS
 *
 */
export function createSessionSuccess() {
  return {
    type: CREATE_SESSION_SUCCESS,
  };
}

/**
 * Dispatched when creating the session fails
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
