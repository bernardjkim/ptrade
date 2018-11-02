import {
  changeSearch,
  changeTimeFrame,
  loadStockData,
  stockDataLoaded,
  stockDataLoadingError,
} from '../actions';
import {
  CHANGE_SEARCH,
  CHANGE_TIME_FRAME,
  LOAD_STOCK_DATA,
  LOAD_STOCK_DATA_SUCCESS,
  LOAD_STOCK_DATA_ERROR,
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

  describe('changeTimeFrame', () => {
    it('has a type of CHANGE_TIME_FRAME', () => {
      const expected = {
        type: CHANGE_TIME_FRAME,
      };
      expect(changeTimeFrame()).toEqual(expected);
    });
  });
  describe('loadStockData', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: LOAD_STOCK_DATA,
      };

      expect(loadStockData()).toEqual(expectedResult);
    });
  });

  describe('stockDataLoaded', () => {
    it('should return the correct type and the passed data', () => {
      const fixture = ['Test'];
      const symbol = 'AAPL';
      const expectedResult = {
        type: LOAD_STOCK_DATA_SUCCESS,
        data: fixture,
        symbol,
      };

      expect(stockDataLoaded(fixture, symbol)).toEqual(expectedResult);
    });
  });

  describe('stockDataLoadingError', () => {
    it('should return the correct type and the error', () => {
      const fixture = {
        msg: 'Something went wrong!',
      };
      const expectedResult = {
        type: LOAD_STOCK_DATA_ERROR,
        error: fixture,
      };

      expect(stockDataLoadingError(fixture)).toEqual(expectedResult);
    });
  });
});
