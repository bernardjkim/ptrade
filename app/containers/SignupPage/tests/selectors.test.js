import { fromJS } from 'immutable';
import {
  selectSignupPageDomain,
  makeSelectEmail,
  makeSelectError,
  makeSelectLoading,
  makeSelectPassword,
  makeSelectUsername,
} from '../selectors';

const mockedState = fromJS({
  signupPage: {
    username: 'username',
    email: 'test@email.com',
    password: 'password',
    loading: false,
    error: 404,
  },
});

describe('selectSignupPageDomain', () => {
  it('should select the SignupPage state', () => {
    expect(selectSignupPageDomain(mockedState)).toMatchSnapshot();
  });
});

describe('makeSelectUsername', () => {
  const usernameSelector = makeSelectUsername();
  it('should select the username', () => {
    expect(usernameSelector(mockedState)).toEqual('username');
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
