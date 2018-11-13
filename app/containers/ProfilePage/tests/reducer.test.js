import { fromJS } from 'immutable';
import profilePageReducer from '../reducer';
import { changeTimeFrame, loadPortfolioValue } from '../actions';

describe('profilePageReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      loading: false,
      error: false,
      portfolioValue: false,
      timeFrame: 0,
    });
  });
  it('returns the initial state', () => {
    expect(profilePageReducer(undefined, {})).toMatchSnapshot();
  });

  it('handles the change time frame action', () => {
    expect(profilePageReducer(state, changeTimeFrame(1))).toMatchSnapshot();
  });

  it('handles the load portfolioValue action', () => {
    expect(profilePageReducer(state, loadPortfolioValue())).toMatchSnapshot();
  });
});
