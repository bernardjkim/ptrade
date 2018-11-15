import { fromJS } from 'immutable';
import {
  selectProfilePageDomain,
  makeSelectError,
  makeSelectLoading,
  makeSelectBalance,
  makeSelectChart,
  makeSelectTimeFrame,
  makeSelectPortfolioValue,
  makeSelectPositions,
} from '../selectors';

const mockedState = fromJS({
  profilePage: {
    loading: false,
    error: 404,
    balance: false,
    positions: false,
    chart: false,
    profileValue: false,
    timeFrame: 0,
  },
});

describe('selectProfilePageDomain', () => {
  it('Expect to have unit tests specified', () => {
    expect(selectProfilePageDomain).toMatchSnapshot();
  });
});

describe('makeSelectLoading', () => {
  const loadingSelector = makeSelectLoading();
  it('should select the loading', () => {
    expect(loadingSelector(mockedState)).toMatchSnapshot();
  });
});

describe('makeSelectError', () => {
  const errorSelector = makeSelectError();
  it('should select the error', () => {
    expect(errorSelector(mockedState)).toMatchSnapshot();
  });
});

describe('makeSelectBalance', () => {
  const balanceSelector = makeSelectBalance();
  it('should select the error', () => {
    expect(balanceSelector(mockedState)).toMatchSnapshot();
  });
});

describe('makeSelectPositions', () => {
  const positionsSelector = makeSelectPositions();
  it('should select the error', () => {
    expect(positionsSelector(mockedState)).toMatchSnapshot();
  });
});

describe('makeSelectChart', () => {
  const chartSelector = makeSelectChart();
  it('should select the error', () => {
    expect(chartSelector(mockedState)).toMatchSnapshot();
  });
});

describe('makeSelectTimeFrame', () => {
  const timeFrameSelector = makeSelectTimeFrame();
  it('should select the error', () => {
    expect(timeFrameSelector(mockedState)).toMatchSnapshot();
  });
});

describe('makeSelectPortfolioValue', () => {
  const portfolioValueSelector = makeSelectPortfolioValue();
  it('should select the error', () => {
    expect(portfolioValueSelector(mockedState)).toMatchSnapshot();
  });
});
