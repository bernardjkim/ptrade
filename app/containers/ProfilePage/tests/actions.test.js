import {
  loadPortfolioValue,
  portfolioValueError,
  portfolioValueSuccess,
  changeTimeFrame,
} from '../actions';
import {
  CHANGE_TIME_FRAME,
  LOAD_PORTFOLIO_VALUE,
  LOAD_PORTFOLIO_VALUE_ERROR,
  LOAD_PORTFOLIO_VALUE_SUCCESS,
} from '../constants';

describe('ProfilePage actions', () => {
  describe('Change time frame', () => {
    it('has a type of CHANGE_TIME_FRAME', () => {
      const expected = {
        type: CHANGE_TIME_FRAME,
      };
      expect(changeTimeFrame()).toEqual(expected);
    });
  });

  describe('Load portfolio value', () => {
    it('has a type of LOAD_PORTFOLIO_VALUE', () => {
      const expected = {
        type: LOAD_PORTFOLIO_VALUE,
      };
      expect(loadPortfolioValue()).toEqual(expected);
    });
  });

  describe('Loaded portfolio value successfully', () => {
    it('has a type of LOAD_PORTFOLIO_VALUE_SUCCESS', () => {
      const expected = {
        type: LOAD_PORTFOLIO_VALUE_SUCCESS,
      };
      expect(portfolioValueSuccess()).toEqual(expected);
    });
  });

  describe('Error loading portfolio value', () => {
    it('has a type of LOAD_PORTFOLIO_VALUE_ERROR', () => {
      const expected = {
        type: LOAD_PORTFOLIO_VALUE_ERROR,
      };
      expect(portfolioValueError()).toEqual(expected);
    });
  });
});
