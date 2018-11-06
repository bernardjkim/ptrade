/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest, put } from 'redux-saga/effects';
import { CREATE_SESSION } from 'containers/App/constants';
import {
  createSessionSuccess,
  createSessionError,
} from 'containers/App/actions';
import signinPageSaga, { getSession } from '../saga';

const email = 'test@email.com';
const password = 'password';

describe('createSession Saga', () => {
  let createSessionGenerator;

  // We have to test twice, once for a successful load and once for an unsuccessful one
  // so we do all the stuff that happens beforehand automatically in the beforeEach
  beforeEach(() => {
    createSessionGenerator = getSession();

    const selectDescriptor = createSessionGenerator.next().value;
    expect(selectDescriptor).toMatchSnapshot();

    createSessionGenerator.next(email);
    createSessionGenerator.next(password);
    const callDescriptor = createSessionGenerator.value;
    expect(callDescriptor).toMatchSnapshot();
  });

  it('request the token successfully', () => {
    const token = 'token';
    const putDescriptor = createSessionGenerator.next(token).value;
    expect(putDescriptor).toEqual(put(createSessionSuccess(token)));
  });

  it('should call the createSessionError action if the response errors', () => {
    const response = new Error('Some error');
    const putDescriptor = createSessionGenerator.throw(response).value;
    expect(putDescriptor).toEqual(put(createSessionError(response)));
  });
});

describe('Saga', () => {
  it('should start task to watch for SigninPage actions', () => {
    const takeLatestDescriptor = signinPageSaga().next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(CREATE_SESSION, getSession),
    );
  });
});
