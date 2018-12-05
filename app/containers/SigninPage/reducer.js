/*
 *
 * SigninPage reducer
 *
 */

import { fromJS } from 'immutable';
import { CHANGE_INPUT } from './constants';

export const initialState = fromJS({
  email: false,
  password: false,
  loading: false,
  error: false,
});

function signinPageReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_INPUT:
      return state.set(action.field, action.value);

    default:
      return state;
  }
}

export default signinPageReducer;
