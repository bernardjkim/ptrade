import {
  changeSearch,
  changeTimeFrame,
  selectSymbol,
  loadChart,
  loadQuote,
} from '../actions';
import {
  CHANGE_SEARCH,
  CHANGE_TIME_FRAME,
  SELECT_SYMBOL,
  LOAD_CHART,
  LOAD_QUOTE,
} from '../constants';

describe('Dashboard actions', () => {
  describe('changeSearch', () => {
    it('has a type of CHANGE_SEARCH', () => {
      const expected = {
        type: CHANGE_SEARCH,
      };
      expect(changeSearch()).toEqual(expected);
    });
  });

  describe('selectSymbol', () => {
    it('has a type of SELECT_SYMBOL', () => {
      const expected = {
        type: SELECT_SYMBOL,
      };
      expect(selectSymbol()).toEqual(expected);
    });
  });

  describe('changeTimeFrame', () => {
    it('has a type of CHANGE_TIME_FRAME', () => {
      const expected = {
        type: CHANGE_TIME_FRAME,
      };
      expect(changeTimeFrame()).toEqual(expected);
    });
  });
  describe('loadChart', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: LOAD_CHART,
      };

      expect(loadChart()).toEqual(expectedResult);
    });
  });

  describe('loadQuote', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: LOAD_QUOTE,
      };

      expect(loadQuote()).toEqual(expectedResult);
    });
  });
});
