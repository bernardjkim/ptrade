import { fromJS } from 'immutable';
import {
  selectProfilePageDomain,
  makeSelectError,
  makeSelectLoading,
  makeSelectPortfolioValue,
  makeSelectTimeFrame,
} from '../selectors';

const mockedState = fromJS({
  profilePage: {
    loading: false,
    error: 404,
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

describe('makeSelectPortfolioValue', () => {
  const portfolioValueSelector = makeSelectPortfolioValue();
  it('should select the error', () => {
    expect(portfolioValueSelector(mockedState)).toMatchSnapshot();
  });
});

describe('makeSelectTimeFrame', () => {
  const timeFrameSelector = makeSelectTimeFrame();
  it('should select the error', () => {
    expect(timeFrameSelector(mockedState)).toMatchSnapshot();
  });
});
