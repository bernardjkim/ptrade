import { fromJS } from 'immutable';

import {
  selectGlobal,
  makeSelectLocation,
  makeSelectToken,
  makeSelectLoading,
  makeSelectError,
} from '../selectors';

describe('makeSelectLocation', () => {
  const locationStateSelector = makeSelectLocation();
  it('should select the location', () => {
    const mockedState = fromJS({
      router: { location: { pathname: '/foo' } },
    });
    expect(locationStateSelector(mockedState)).toEqual(
      mockedState.getIn(['router', 'location']).toJS(),
    );
  });
});

describe('selectGlobal', () => {
  it('should select the global state', () => {
    const globalState = fromJS({});
    const mockedState = fromJS({
      global: globalState,
    });
    expect(selectGlobal(mockedState)).toEqual(globalState);
  });
});

describe('makeSelectLocation', () => {
  const locationStateSelector = makeSelectLocation();
  it('should select the location', () => {
    const mockedState = fromJS({
      router: { location: { pathname: '/foo' } },
    });
    expect(locationStateSelector(mockedState)).toEqual(
      mockedState.getIn(['router', 'location']).toJS(),
    );
  });
});

describe('makeSelectToken', () => {
  const searchSelector = makeSelectToken();
  it('should select the token', () => {
    const token = 'token';
    const mockedState = fromJS({
      global: {
        token,
      },
    });
    expect(searchSelector(mockedState)).toEqual(token);
  });
});

describe('makeSelectLoading', () => {
  const searchSelector = makeSelectLoading();
  it('should select the loading value', () => {
    const loading = false;
    const mockedState = fromJS({
      global: {
        loading,
      },
    });
    expect(searchSelector(mockedState)).toEqual(false);
  });
});

describe('makeSelectError', () => {
  const searchSelector = makeSelectError();
  it('should select the error', () => {
    const error = 404;
    const mockedState = fromJS({
      global: {
        error,
      },
    });
    expect(searchSelector(mockedState)).toEqual(error);
  });
});
