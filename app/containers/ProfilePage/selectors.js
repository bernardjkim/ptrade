import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the profilePage state domain
 */

const selectProfilePageDomain = state => state.get('profilePage', initialState);

/**
 * Other specific selectors
 */
const makeSelectLoading = () =>
  createSelector(selectProfilePageDomain, profileState =>
    profileState.get('loading'),
  );

const makeSelectError = () =>
  createSelector(selectProfilePageDomain, profileState =>
    profileState.get('error'),
  );

const makeSelectBalance = () =>
  createSelector(selectProfilePageDomain, profileState =>
    profileState.get('balance'),
  );

const makeSelectPositions = () =>
  createSelector(selectProfilePageDomain, profileState =>
    profileState.get('positions'),
  );

const makeSelectChart = () =>
  createSelector(selectProfilePageDomain, profileState =>
    profileState.get('chart'),
  );

const makeSelectTotalInvested = () =>
  createSelector(selectProfilePageDomain, profileState =>
    profileState.get('totalInvested'),
  );

const makeSelectTimeFrame = () =>
  createSelector(selectProfilePageDomain, profileState =>
    profileState.get('timeFrame'),
  );

const makeSelectTransferAmount = () =>
  createSelector(selectProfilePageDomain, profileState =>
    profileState.get('transferAmount'),
  );

/**
 * Default selector used by ProfilePage
 */

const makeSelectProfilePage = () =>
  createSelector(selectProfilePageDomain, substate => substate.toJS());

export default makeSelectProfilePage;
export {
  selectProfilePageDomain,
  makeSelectLoading,
  makeSelectError,
  makeSelectBalance,
  makeSelectChart,
  makeSelectPositions,
  makeSelectTotalInvested,
  makeSelectTimeFrame,
  makeSelectTransferAmount,
};
