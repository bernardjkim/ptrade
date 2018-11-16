/*
 *
 * SigninPage actions
 *
 */

import { CHANGE_INPUT } from './constants';

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
