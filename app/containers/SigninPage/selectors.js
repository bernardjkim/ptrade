import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the signinPage state domain
 */

const selectSigninPageDomain = state => state.get('signinPage', initialState);

/**
 * Other specific selectors
 */
const makeSelectEmail = () =>
  createSelector(selectSigninPageDomain, homeState => homeState.get('email'));

const makeSelectPassword = () =>
  createSelector(selectSigninPageDomain, homeState =>
    homeState.get('password'),
  );

const makeSelectLoading = () =>
  createSelector(selectSigninPageDomain, homeState => homeState.get('loading'));

const makeSelectError = () =>
  createSelector(selectSigninPageDomain, homeState => homeState.get('error'));
/**
 * Default selector used by SigninPage
 */

const makeSelectSigninPage = () =>
  createSelector(selectSigninPageDomain, substate => substate.toJS());

export default makeSelectSigninPage;
export {
  selectSigninPageDomain,
  makeSelectEmail,
  makeSelectError,
  makeSelectLoading,
  makeSelectPassword,
};
