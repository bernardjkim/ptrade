import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the signupPage state domain
 */

const selectSignupPageDomain = state => state.get('signupPage', initialState);

/**
 * Other specific selectors
 */
const makeSelectUsername = () =>
  createSelector(selectSignupPageDomain, homeState =>
    homeState.get('username'),
  );

const makeSelectEmail = () =>
  createSelector(selectSignupPageDomain, homeState => homeState.get('email'));

const makeSelectPassword = () =>
  createSelector(selectSignupPageDomain, homeState =>
    homeState.get('password'),
  );

const makeSelectLoading = () =>
  createSelector(selectSignupPageDomain, homeState => homeState.get('loading'));

const makeSelectError = () =>
  createSelector(selectSignupPageDomain, homeState => homeState.get('error'));

/**
 * Default selector used by SignupPage
 */

const makeSelectSignupPage = () =>
  createSelector(selectSignupPageDomain, substate => substate.toJS());

export default makeSelectSignupPage;
export {
  selectSignupPageDomain,
  makeSelectEmail,
  makeSelectError,
  makeSelectLoading,
  makeSelectPassword,
  makeSelectUsername,
};
