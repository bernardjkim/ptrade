import { fromJS } from 'immutable';
import {
  selectSigninPageDomain,
  makeSelectEmail,
  makeSelectError,
  makeSelectLoading,
  makeSelectPassword,
} from '../selectors';

const mockedState = fromJS({
  signinPage: {
    token: 'token',
    email: 'test@email.com',
    password: 'password',
    loading: false,
    error: 404,
  },
});

describe('selectSigninPageDomain', () => {
  it('should select the SigninPage state', () => {
    expect(selectSigninPageDomain(mockedState)).toMatchSnapshot();
  });
});

describe('makeSelectEmail', () => {
  const emailSelector = makeSelectEmail();
  it('should select the email', () => {
    expect(emailSelector(mockedState)).toEqual('test@email.com');
  });
});

describe('makeSelectPassword', () => {
  const passwordSelector = makeSelectPassword();
  it('should select the password', () => {
    expect(passwordSelector(mockedState)).toEqual('password');
  });
});

describe('makeSelectLoading', () => {
  const loadingSelector = makeSelectLoading();
  it('should select the loading', () => {
    expect(loadingSelector(mockedState)).toEqual(false);
  });
});

describe('makeSelectError', () => {
  const errorSelector = makeSelectError();
  it('should select the error', () => {
    expect(errorSelector(mockedState)).toEqual(404);
  });
});
