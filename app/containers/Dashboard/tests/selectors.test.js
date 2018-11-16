import { fromJS } from 'immutable';
import {
  selectDashboardDomain,
  makeSelectSearch,
  makeSelectSymbol,
  makeSelectTimeFrame,
  makeSelectChart,
  makeSelectQuote,
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

describe('makeSelectSearch', () => {
  const searchSelector = makeSelectSearch();
  it('should select the search symbol', () => {
    const search = 'AAPL';
    const mockedState = fromJS({
      dashboard: {
        search,
      },
    });
    expect(searchSelector(mockedState)).toEqual(search);
  });
});

describe('makeSelectSymbol', () => {
  const symbolSelector = makeSelectSymbol();
  it('should select the selected symbol', () => {
    const symbol = 'AAPL';
    const mockedState = fromJS({
      dashboard: {
        symbol,
      },
    });
    expect(symbolSelector(mockedState)).toEqual(symbol);
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

describe('makeSelectChart', () => {
  const dataSelector = makeSelectChart();
  it('should select the chart data', () => {
    const chart = fromJS([{ date: 1, value: 1 }]);
    const mockedState = fromJS({
      dashboard: {
        chart,
      },
    });
    expect(dataSelector(mockedState)).toEqual(chart);
  });
});

describe('makeSelectQuote', () => {
  const quoteSelector = makeSelectQuote();
  it('should select the quote', () => {
    const quote = fromJS({ quote: {} });
    const mockedState = fromJS({
      dashboard: {
        quote,
      },
    });
    expect(quoteSelector(mockedState)).toEqual(quote);
  });
});

describe('makeSelectLoading', () => {
  const loadingSelector = makeSelectLoading();
  it('should select the loading state', () => {
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
