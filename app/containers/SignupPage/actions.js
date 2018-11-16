/*
 *
 * SignupPage actions
 *
 */

import {
  CHANGE_INPUT,
  CREATE_USER,
  CREATE_USER_ERROR,
  CREATE_USER_SUCCESS,
} from './constants';

/**
 * Change the input value for specified field
 *
 * @param  {string} field The field to be changed
 * @param  {string} value The value to be set
 *
 * @return {object}       An object of type CHANGE_INPUT
 */
export function changeInput(field, value) {
  return {
    type: CHANGE_INPUT,
    field,
    value,
  };
}

/**
 * Create user, this action starts the request saga
 *
 * @return {object} An action object with a type of CREATE_USER
 */
export function createUser() {
  return {
    type: CREATE_USER,
  };
}

/**
 * Dispatched when the user is successfuly created
 *
 * @return {object} An action object with a type of CREATE_USER_SUCCESS
 *
 */
export function createUserSuccess() {
  return {
    type: CREATE_USER_SUCCESS,
  };
}

/**
 * Dispatched when creating the user fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of CREATE_USER_ERROR
 *                        passing the error
 */
export function createUserError(error) {
  return {
    type: CREATE_USER_ERROR,
    error,
  };
}
