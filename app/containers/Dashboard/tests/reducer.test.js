import { fromJS } from 'immutable';
import dashboardReducer from '../reducer';
import {
  changeSearch,
  changeTimeFrame,
  selectSymbol,
  loadChart,
  loadQuote,
  changeTradeQuantity,
  requestTrade,
} from '../actions';

describe('dashboardReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      loading: false,
      error: false,
      search: false,
      symbol: false,
      timeFrame: 0,
      chart: false,
      quote: false,
      quantity: 0,
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

  it('handles the changeQuantity action', () => {
    expect(dashboardReducer(state, changeTradeQuantity(5))).toMatchSnapshot();
  });

  it('should handle the loadChart action correctly', () => {
    expect(dashboardReducer(state, loadChart())).toMatchSnapshot();
  });

  it('should handle the loadQuote action correctly', () => {
    expect(dashboardReducer(state, loadQuote())).toMatchSnapshot();
  });

  it('should handle the requestTrade action', () => {
    expect(dashboardReducer(state, requestTrade())).toMatchSnapshot();
  });
});
