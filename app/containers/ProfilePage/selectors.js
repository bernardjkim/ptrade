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

const makeSelectPortfolioValue = () =>
  createSelector(selectProfilePageDomain, profileState =>
    profileState.get('protfolioValue'),
  );

const makeSelectTimeFrame = () =>
  createSelector(selectProfilePageDomain, profileState =>
    profileState.get('timeFrame'),
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
  makeSelectPortfolioValue,
  makeSelectTimeFrame,
};
