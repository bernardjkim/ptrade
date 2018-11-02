import { fromJS } from 'immutable';
import dashboardReducer from '../reducer';
import {
  changeSearch,
  changeTimeFrame,
  loadStockData,
  stockDataLoaded,
  stockDataLoadingError,
} from '../actions';

describe('dashboardReducer', () => {
  let state;
  beforeEach(() => {
    state = fromJS({
      search: false,
      loading: false,
      error: false,
      currentSymbol: false,
      stockData: false,
    });
  });
  it('returns the initial state', () => {
    expect(dashboardReducer(undefined, {})).toMatchSnapshot();
  });

  it('handles the changeSearch action', () => {
    expect(dashboardReducer(state, changeSearch('AAPL'))).toMatchSnapshot();
  });

  it('handles the changeTimeFrame action', () => {
    expect(dashboardReducer(state, changeTimeFrame(1))).toMatchSnapshot();
  });

  it('should handle the loadStockData action correctly', () => {
    expect(dashboardReducer(state, loadStockData())).toMatchSnapshot();
  });

  it('should handle the stockDataLoaded action correctly', () => {
    const fixture = [
      {
        name: 'My Repo',
      },
    ];
    const currentSymbol = 'AAPL';

    expect(
      dashboardReducer(state, stockDataLoaded(fixture, currentSymbol)),
    ).toMatchSnapshot();
  });

  it('should handle the stockDataLoadingError action correctly', () => {
    const fixture = {
      msg: 'Not found',
    };
    expect(
      dashboardReducer(state, stockDataLoadingError(fixture)),
    ).toMatchSnapshot();
  });
});
