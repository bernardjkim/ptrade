import { fromJS } from 'immutable';

import {
  selectGlobal,
  makeSelectLocation,
  makeSelectToken,
  makeSelectEmail,
  makeSelectPassword,
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
  const tokenSelector = makeSelectToken();
  it('should select the token', () => {
    const token = 'token';
    const mockedState = fromJS({
      global: {
        token,
      },
    });
    expect(tokenSelector(mockedState)).toEqual(token);
  });
});

describe('makeSelectEmail', () => {
  const emailSelector = makeSelectEmail();
  it('should select the email', () => {
    const email = 'email';
    const mockedState = fromJS({
      global: {
        email,
      },
    });
    expect(emailSelector(mockedState)).toEqual(email);
  });
});

describe('makeSelectPassword', () => {
  const passwordSelector = makeSelectPassword();
  it('should select the password', () => {
    const password = 'password';
    const mockedState = fromJS({
      global: {
        password,
      },
    });
    expect(passwordSelector(mockedState)).toEqual(password);
  });
});

describe('makeSelectLoading', () => {
  const loadingSelector = makeSelectLoading();
  it('should select the loading value', () => {
    const loading = false;
    const mockedState = fromJS({
      global: {
        loading,
      },
    });
    expect(loadingSelector(mockedState)).toEqual(false);
  });
});

describe('makeSelectError', () => {
  const errorSelector = makeSelectError();
  it('should select the error', () => {
    const error = 404;
    const mockedState = fromJS({
      global: {
        error,
      },
    });
    expect(errorSelector(mockedState)).toEqual(error);
  });
});
