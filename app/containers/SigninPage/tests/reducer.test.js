import { fromJS } from 'immutable';
import signinPageReducer from '../reducer';
import { changeInput } from '../actions';

describe('signinPageReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      email: false,
      password: false,
      loading: false,
      error: false,
    });
  });
  it('returns the initial state', () => {
    expect(signinPageReducer(undefined, {})).toMatchSnapshot();
  });

  it('handles the changeInput action', () => {
    expect(
      signinPageReducer(state, changeInput('email', 'test@email.com')),
    ).toMatchSnapshot();
  });
});
