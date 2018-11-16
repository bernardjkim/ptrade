import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the dashboard state domain
 */

const selectDashboardDomain = state => state.get('dashboard', initialState);

/**
 * Other specific selectors
 */
const makeSelectSearch = () =>
  createSelector(selectDashboardDomain, homeState => homeState.get('search'));

const makeSelectSymbol = () =>
  createSelector(selectDashboardDomain, homeState => homeState.get('symbol'));

const makeSelectTimeFrame = () =>
  createSelector(selectDashboardDomain, homeState =>
    homeState.get('timeFrame'),
  );

const makeSelectChart = () =>
  createSelector(selectDashboardDomain, homeState => homeState.get('chart'));

const makeSelectQuote = () =>
  createSelector(selectDashboardDomain, homeState => homeState.get('quote'));

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
  makeSelectSearch,
  makeSelectSymbol,
  makeSelectTimeFrame,
  makeSelectLoading,
  makeSelectError,
  makeSelectChart,
  makeSelectQuote,
};
