import { changeInput } from '../actions';
import { CHANGE_INPUT } from '../constants';

describe('SigninPage actions', () => {
  describe('changeInput', () => {
    it('should return the correct type', () => {
      const expectedResult = {
        type: CHANGE_INPUT,
      };
      expect(changeInput()).toEqual(expectedResult);
    });
  });
});
