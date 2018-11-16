import {
  loadBalance,
  loadBalanceError,
  loadBalanceSuccess,
  changeTimeFrame,
  loadPositions,
  loadPositionsSuccess,
  loadPositionsError,
  loadChart,
  loadChartSuccess,
  loadChartError,
} from '../actions';
import {
  CHANGE_TIME_FRAME,
  LOAD_BALANCE,
  LOAD_BALANCE_ERROR,
  LOAD_BALANCE_SUCCESS,
  LOAD_POSITIONS,
  LOAD_POSITIONS_SUCCESS,
  LOAD_POSITIONS_ERROR,
  LOAD_CHART,
  LOAD_CHART_SUCCESS,
  LOAD_CHART_ERROR,
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

  describe('Load balance', () => {
    it('has a type of LOAD_PORTFOLIO_VALUE', () => {
      const expected = {
        type: LOAD_BALANCE,
      };
      expect(loadBalance()).toEqual(expected);
    });
  });

  describe('Loaded balance successfully', () => {
    it('has a type of LOAD_BALANCE_SUCCESS', () => {
      const balance = 100;
      const expected = {
        type: LOAD_BALANCE_SUCCESS,
        balance,
      };
      expect(loadBalanceSuccess(balance)).toEqual(expected);
    });
  });

  describe('Error loading balance', () => {
    it('has a type of LOAD_BALANCE_ERROR', () => {
      const error = 400;
      const expected = {
        type: LOAD_BALANCE_ERROR,
        error,
      };
      expect(loadBalanceError(error)).toEqual(expected);
    });
  });

  describe('Load positions', () => {
    it('has a type of LOAD_POSITIONS', () => {
      const expected = {
        type: LOAD_POSITIONS,
      };
      expect(loadPositions()).toEqual(expected);
    });
  });

  describe('Loaded positions successfully', () => {
    it('has a type of LOAD_POSITIONS_SUCCESS', () => {
      const positions = [];
      const total = 0;
      const expected = {
        type: LOAD_POSITIONS_SUCCESS,
        positions,
        total,
      };
      expect(loadPositionsSuccess(positions)).toEqual(expected);
    });
  });

  describe('Error loading positions', () => {
    it('has a type of LOAD_POSITIONS_ERROR', () => {
      const error = 400;
      const expected = {
        type: LOAD_POSITIONS_ERROR,
        error,
      };
      expect(loadPositionsError(error)).toEqual(expected);
    });
  });

  describe('Load chart', () => {
    it('has a type of LOAD_CHART', () => {
      const expected = {
        type: LOAD_CHART,
      };
      expect(loadChart()).toEqual(expected);
    });
  });

  describe('Loaded chart successfully', () => {
    it('has a type of LOAD_CHART_SUCCESS', () => {
      const chart = [];
      const expected = {
        type: LOAD_CHART_SUCCESS,
        chart,
      };
      expect(loadChartSuccess(chart)).toEqual(expected);
    });
  });

  describe('Error loading chart', () => {
    it('has a type of LOAD_CHART_ERROR', () => {
      const error = 400;
      const expected = {
        type: LOAD_CHART_ERROR,
        error,
      };
      expect(loadChartError(error)).toEqual(expected);
    });
  });
});
