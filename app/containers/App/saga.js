import { call, put, select, takeLatest } from 'redux-saga/effects';
import qs from 'qs';
import request from 'utils/request';
import { urlCreateSession } from 'api/api';
import { CREATE_SESSION } from './constants';
import { createSessionSuccess, createSessionError, loadToken } from './actions';
import { makeSelectEmail, makeSelectPassword } from './selectors';

/**
 * create session request/response handler
 */
export function* getSession() {
  // Select email from store
  const email = yield select(makeSelectEmail());
  if (!email) return;

  // Select password from store
  const password = yield select(makeSelectPassword());
  if (!password) return;

  // get url to request new session
  const requestURL = urlCreateSession;
  if (requestURL === '') return;

  // set request method/header/body
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: qs.stringify({ email, password }),
  };

  try {
    // Call our request helper (see 'utils/request')
    const token = yield call(request, requestURL, options);

    // store jwtToken into session storage
    sessionStorage.setItem('jwtToken', token['Session-Token']);

    yield put(createSessionSuccess());
    yield put(loadToken());
  } catch (err) {
    yield put(createSessionError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* appSaga() {
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(CREATE_SESSION, getSession);
}
