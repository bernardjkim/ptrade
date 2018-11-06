// import React from 'react';
// import { mount } from 'enzyme';
import { mapDispatchToProps } from '../index';
import { changeInput } from '../actions';

describe('mapDispatchToProps', () => {
  describe('handleChangeInput', () => {
    it('should be injected', () => {
      const dispatch = jest.fn();
      const result = mapDispatchToProps(dispatch);
      expect(result.handleChangeInput).toBeDefined();
    });

    it('should dispatch handleChangeInput when called', () => {
      const dispatch = jest.fn();
      const result = mapDispatchToProps(dispatch);
      const field = 'email';
      const value = 'test@email.com';
      result.handleChangeInput(field, value);
      expect(dispatch).toHaveBeenCalledWith(changeInput(field, value));
    });
  });

  describe('handleSubmit', () => {
    it('should be injected', () => {
      const dispatch = jest.fn();
      const result = mapDispatchToProps(dispatch);
      expect(result.handleSubmit).toBeDefined();
    });

    it('should preventDefault if called with event', () => {
      const preventDefault = jest.fn();
      const result = mapDispatchToProps(() => {});
      const evt = { preventDefault };
      result.handleSubmit(evt);
      expect(preventDefault).toHaveBeenCalledWith();
    });
  });
});
