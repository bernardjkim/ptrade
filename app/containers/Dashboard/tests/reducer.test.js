import { fromJS } from 'immutable';
import dashboardReducer from '../reducer';
import {
  changeSearch,
  changeTimeFrame,
  selectSymbol,
  loadChart,
  loadQuote,
} from '../actions';

describe('dashboardReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      search: false,
      symbol: false,
      loading: false,
      error: false,
      chart: false,
      quote: false,
    });
  });
  it('returns the initial state', () => {
    expect(dashboardReducer(undefined, {})).toMatchSnapshot();
  });

  it('handles the changeSearch action', () => {
    expect(dashboardReducer(state, changeSearch('AAPL'))).toMatchSnapshot();
  });

  it('handles the selectSymbol action', () => {
    expect(dashboardReducer(state, selectSymbol('AAPL'))).toMatchSnapshot();
  });

  it('handles the changeTimeFrame action', () => {
    expect(dashboardReducer(state, changeTimeFrame(1))).toMatchSnapshot();
  });

  it('should handle the loadChart action correctly', () => {
    expect(dashboardReducer(state, loadChart())).toMatchSnapshot();
  });

  it('should handle the loadQuote action correctly', () => {
    expect(dashboardReducer(state, loadQuote())).toMatchSnapshot();
  });
});
