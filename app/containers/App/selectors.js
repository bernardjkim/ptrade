import { createSelector } from 'reselect';

const selectGlobal = state => state.get('global');

const selectRouter = state => state.get('router');

const makeSelectLocation = () =>
  createSelector(selectRouter, routerState =>
    routerState.get('location').toJS(),
  );

const makeSelectToken = () =>
  createSelector(selectGlobal, globalState => globalState.get('token'));

const makeSelectEmail = () =>
  createSelector(selectGlobal, globalState => globalState.get('email'));

const makeSelectPassword = () =>
  createSelector(selectGlobal, globalState => globalState.get('password'));

const makeSelectLoading = () =>
  createSelector(selectGlobal, globalState => globalState.get('loading'));

const makeSelectError = () =>
  createSelector(selectGlobal, globalState => globalState.get('error'));

export {
  selectGlobal,
  makeSelectLocation,
  makeSelectToken,
  makeSelectEmail,
  makeSelectPassword,
  makeSelectError,
  makeSelectLoading,
};
