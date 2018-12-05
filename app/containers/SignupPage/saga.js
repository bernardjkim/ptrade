import { call, put, select, takeLatest } from 'redux-saga/effects';
import qs from 'qs';
import request from 'utils/request';
import { urlCreateUser } from 'api/api';
import { createSession } from 'containers/App/actions';
import { createUserSuccess, createUserError } from './actions';
import { CREATE_USER } from './constants';
import {
  makeSelectUsername,
  makeSelectEmail,
  makeSelectPassword,
} from './selectors';

/**
 * create user request/response handler
 */
export function* createNewUser() {
  // Select username from store
  const username = yield select(makeSelectUsername());
  if (!username) return;

  // Select email from store
  const email = yield select(makeSelectEmail());
  if (!email) return;

  // Select password from store
  const password = yield select(makeSelectPassword());
  if (!password) return;

  // get url to request new session
  const requestURL = urlCreateUser;
  if (requestURL === '') return;

  // set request method/header/body
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    // TODO: currently accepts first and last not username
    body: qs.stringify({ first: username, last: username, email, password }),
  };

  try {
    // Call our request helper (see 'utils/request')
    yield call(request, requestURL, options);
    yield put(createUserSuccess());
    yield put(createSession(email, password));
  } catch (err) {
    yield put(createUserError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* signupPageSaga() {
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(CREATE_USER, createNewUser);
}
