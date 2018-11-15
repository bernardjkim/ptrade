/*
 *
 * App reducer
 *
 */

import { fromJS } from 'immutable';
import {
  LOAD_TOKEN,
  CREATE_SESSION,
  CREATE_SESSION_SUCCESS,
  CREATE_SESSION_ERROR,
  DELETE_SESSION,
} from './constants';

export const initialState = fromJS({
  loading: false,
  error: false,
  token: false,
  email: false,
  password: false,
});

function appReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_TOKEN:
      return state.set('token', action.token);

    case DELETE_SESSION:
      return state.set('token', false);

    case CREATE_SESSION:
      return state
        .set('loading', true)
        .set('error', false)
        .set('email', action.email)
        .set('password', action.password);
    case CREATE_SESSION_SUCCESS:
      return state
        .set('loading', false)
        .set('email', false)
        .set('password', false);
    case CREATE_SESSION_ERROR:
      return state
        .set('error', action.error)
        .set('loading', false)
        .set('email', false)
        .set('password', false);
    default:
      return state;
  }
}

export default appReducer;
