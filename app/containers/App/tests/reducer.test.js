import { fromJS } from 'immutable';
import appReducer from '../reducer';
import { loadToken, createSession, deleteSession } from '../actions';

describe('appReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      token: false,
      loading: false,
      error: false,
    });
  });
  it('returns the initial state', () => {
    expect(appReducer(undefined, {})).toMatchSnapshot();
  });

  it('handles the loadToken action', () => {
    expect(appReducer(state, loadToken())).toMatchSnapshot();
  });

  it('handles the createSession action', () => {
    expect(appReducer(state, createSession())).toMatchSnapshot();
  });

  it('handles the deleteSession action', () => {
    expect(appReducer(state, deleteSession())).toMatchSnapshot();
  });
});
