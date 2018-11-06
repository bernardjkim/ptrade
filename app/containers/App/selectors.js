import { createSelector } from 'reselect';

const selectGlobal = state => state.get('global');

const selectRouter = state => state.get('router');

const makeSelectLocation = () =>
  createSelector(selectRouter, routerState =>
    routerState.get('location').toJS(),
  );

const makeSelectToken = () =>
  createSelector(selectGlobal, globalState => globalState.get('token'));

export { selectGlobal, makeSelectLocation, makeSelectToken };
