import { fromJS } from 'immutable';
import {
  selectDashboardDomain,
  makeSelectSymbol,
  makeSelectTimeFrame,
  makeSelectStockData,
  makeSelectLoading,
  makeSelectError,
} from '../selectors';

describe('selectDashboardDomain', () => {
  it('should select the dashboard state', () => {
    const mockedState = fromJS({
      search: 'AAPL',
      timeFrame: 0,
    });
    expect(selectDashboardDomain(mockedState)).toMatchSnapshot();
  });
});

describe('makeSelectSymbol', () => {
  const symbolSelector = makeSelectSymbol();
  it('should select the symbol', () => {
    const search = 'AAPL';
    const mockedState = fromJS({
      dashboard: {
        search,
      },
    });
    expect(symbolSelector(mockedState)).toEqual(search);
  });
});

describe('makeSelectTimeFrame', () => {
  const timeFrameSelector = makeSelectTimeFrame();
  it('should select the timeFrame', () => {
    const timeFrame = 1;
    const mockedState = fromJS({
      dashboard: {
        timeFrame,
      },
    });
    expect(timeFrameSelector(mockedState)).toEqual(timeFrame);
  });
});

describe('makeSelectStockData', () => {
  const currentUserSelector = makeSelectStockData();
  it('should select the stock data', () => {
    const stockData = fromJS([{ date: 1, value: 1 }]);
    const mockedState = fromJS({
      dashboard: {
        stockData,
      },
    });
    expect(currentUserSelector(mockedState)).toEqual(stockData);
  });
});

describe('makeSelectLoading', () => {
  const loadingSelector = makeSelectLoading();
  it('should select the loading', () => {
    const loading = false;
    const mockedState = fromJS({
      dashboard: {
        loading,
      },
    });
    expect(loadingSelector(mockedState)).toEqual(loading);
  });
});

describe('makeSelectError', () => {
  const errorSelector = makeSelectError();
  it('should select the error', () => {
    const error = 404;
    const mockedState = fromJS({
      dashboard: {
        error,
      },
    });
    expect(errorSelector(mockedState)).toEqual(error);
  });
});
