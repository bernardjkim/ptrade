import { fromJS } from 'immutable';
import signupPageReducer from '../reducer';
import { changeInput, createUser } from '../actions';

describe('signupPageReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      username: false,
      email: false,
      password: false,
      loading: false,
      error: false,
    });
  });
  it('returns the initial state', () => {
    expect(signupPageReducer(undefined, {})).toMatchSnapshot();
  });

  it('handles the changeInput action for email', () => {
    expect(
      signupPageReducer(state, changeInput('email', 'test@email.com')),
    ).toMatchSnapshot();
  });

  it('handles the changeInput action for username', () => {
    expect(
      signupPageReducer(state, changeInput('username', 'username')),
    ).toMatchSnapshot();
  });

  it('handles the changeInput action for password', () => {
    expect(
      signupPageReducer(state, changeInput('password', 'password')),
    ).toMatchSnapshot();
  });

  it('handles the create user action', () => {
    expect(signupPageReducer(state, createUser())).toMatchSnapshot();
  });
});
