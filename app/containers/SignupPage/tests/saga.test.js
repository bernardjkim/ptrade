/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { takeLatest, put } from 'redux-saga/effects';
import { CREATE_USER } from '../constants';
import { createUserSuccess, createUserError } from '../actions';
import signupPageSaga, { createNewUser } from '../saga';

const generator = signupPageSaga();

const username = 'username';
const email = 'test@email.com';
const password = 'password';

describe('createUser Saga', () => {
  let createUserGenerator;

  // We have to test twice, once for a successful load and once for an unsuccessful one
  // so we do all the stuff that happens beforehand automatically in the beforeEach
  beforeEach(() => {
    createUserGenerator = createNewUser();

    const selectDescriptor = createUserGenerator.next().value;
    expect(selectDescriptor).toMatchSnapshot();

    createUserGenerator.next(username);
    createUserGenerator.next(email);
    createUserGenerator.next(password);
    const callDescriptor = createUserGenerator.value;
    expect(callDescriptor).toMatchSnapshot();
  });

  it('created user successfully', () => {
    const putDescriptor = createUserGenerator.next().value;
    expect(putDescriptor).toEqual(put(createUserSuccess()));
  });

  it('should call the createUserError action if the response errors', () => {
    const response = new Error('Some error');
    const putDescriptor = createUserGenerator.throw(response).value;
    expect(putDescriptor).toEqual(put(createUserError(response)));
  });
});

describe('Saga', () => {
  it('should start task to watch for SigninPage actions', () => {
    const takeLatestDescriptor = generator.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(CREATE_USER, createNewUser),
    );
  });
});
