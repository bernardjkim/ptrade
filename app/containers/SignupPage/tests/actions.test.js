import { changeInput, createUser } from '../actions';
import { CHANGE_INPUT, CREATE_USER } from '../constants';

describe('SignupPage actions', () => {
  describe('changeInput', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: CHANGE_INPUT,
      };
      expect(changeInput()).toEqual(expectedResult);
    });
  });

  describe('createUser', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: CREATE_USER,
      };
      expect(createUser()).toEqual(expectedResult);
    });
  });
});
