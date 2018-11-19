import {
  changeSearch,
  changeTimeFrame,
  selectSymbol,
  loadChart,
  loadQuote,
  changeTradeQuantity,
  requestTrade,
} from '../actions';
import {
  CHANGE_SEARCH,
  CHANGE_TIME_FRAME,
  SELECT_SYMBOL,
  LOAD_CHART,
  LOAD_QUOTE,
  CHANGE_QUANTITY,
  REQUEST_TRADE,
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

  describe('changeQuantity', () => {
    it('has a type of CHANGE_QUANTITY', () => {
      const expected = {
        type: CHANGE_QUANTITY,
      };
      expect(changeTradeQuantity()).toEqual(expected);
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

  describe('requestTrade', () => {
    it('has type of REQUEST_TRADE', () => {
      const expectedResult = {
        type: REQUEST_TRADE,
      };
      expect(requestTrade()).toEqual(expectedResult);
    });
  });
});
