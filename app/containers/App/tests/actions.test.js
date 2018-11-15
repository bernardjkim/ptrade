import { loadToken, createSession, deleteSession } from '../actions';
import { LOAD_TOKEN, CREATE_SESSION, DELETE_SESSION } from '../constants';

describe('Dashboard actions', () => {
  describe('loadToken', () => {
    it('has a type of LOAD_TOKEN', () => {
      const token = false;
      const expected = {
        type: LOAD_TOKEN,
        token,
      };
      expect(loadToken()).toEqual(expected);
    });
  });
  describe('createSession', () => {
    it('has a type of CREATE_SESSION', () => {
      const email = 'email';
      const password = 'password';
      const expected = {
        type: CREATE_SESSION,
        email,
        password,
      };
      expect(createSession(email, password)).toEqual(expected);
    });
  });
  describe('deleteSession', () => {
    it('has a type of DELETE_SESSION', () => {
      const expected = {
        type: DELETE_SESSION,
      };
      expect(deleteSession()).toEqual(expected);
    });
  });
});
