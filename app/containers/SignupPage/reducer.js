/*
 *
 * SignupPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  CHANGE_INPUT,
  CREATE_USER,
  CREATE_USER_SUCCESS,
  CREATE_USER_ERROR,
} from './constants';

export const initialState = fromJS({
  username: false,
  email: false,
  password: false,
  loading: false,
  error: false,
});
function signupPageReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_INPUT:
      return state.set(action.field, action.value);

    case CREATE_USER:
      return state.set('loading', true).set('error', false);
    case CREATE_USER_SUCCESS:
      return state.set('loading', false);
    case CREATE_USER_ERROR:
      return state.set('loading', false).set('error', action.error);
    default:
      return state;
  }
}

export default signupPageReducer;
