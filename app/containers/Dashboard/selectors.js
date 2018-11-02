import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the dashboard state domain
 */

const selectDashboardDomain = state => state.get('dashboard', initialState);

/**
 * Other specific selectors
 */
const makeSelectSymbol = () =>
  createSelector(selectDashboardDomain, homeState => homeState.get('search'));

const makeSelectTimeFrame = () =>
  createSelector(selectDashboardDomain, homeState =>
    homeState.get('timeFrame'),
  );

const makeSelectStockData = () =>
  createSelector(selectDashboardDomain, homeState =>
    homeState.get('stockData'),
  );

const makeSelectLoading = () =>
  createSelector(selectDashboardDomain, homeState => homeState.get('loading'));

const makeSelectError = () =>
  createSelector(selectDashboardDomain, homeState => homeState.get('error'));

/**
 * Default selector used by Dashboard
 */

const makeSelectDashboard = () =>
  createSelector(selectDashboardDomain, substate => substate.toJS());

export default makeSelectDashboard;
export {
  selectDashboardDomain,
  makeSelectSymbol,
  makeSelectTimeFrame,
  makeSelectLoading,
  makeSelectError,
  makeSelectStockData,
};
