/*
 *
 * App reducer
 *
 */

import { fromJS } from 'immutable';
import {
  CREATE_SESSION,
  CREATE_SESSION_SUCCESS,
  CREATE_SESSION_ERROR,
} from './constants';

export const initialState = fromJS({
  token: false,
  loading: false,
  error: false,
});

function signinPageReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_SESSION:
      return state.set('loading', true).set('error', false);
    case CREATE_SESSION_SUCCESS:
      return state
        .set('token', action.token['Session-Token'])
        .set('loading', false);
    case CREATE_SESSION_ERROR:
      return state.set('error', action.error).set('loading', false);
    default:
      return state;
  }
}

export default signinPageReducer;
