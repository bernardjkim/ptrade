// import React from 'react';
// import { shallow } from 'enzyme';

import { mapDispatchToProps } from '../index';
import { changeSearch, changeTimeFrame, selectSymbol } from '../actions';

describe('mapDispatchToProps', () => {
  describe('handleChangeSearch', () => {
    it('should be injected', () => {
      const dispatch = jest.fn();
      const result = mapDispatchToProps(dispatch);
      expect(result.handleChangeSearch).toBeDefined();
    });

    it('should dispatch handleChangeSearch when called', () => {
      const dispatch = jest.fn();
      const result = mapDispatchToProps(dispatch);
      const search = 'AAPL';
      result.handleChangeSearch({ target: { value: search } });
      expect(dispatch).toHaveBeenCalledWith(changeSearch(search));
    });
  });

  describe('handleChangeTimeFrame', () => {
    it('should be injected', () => {
      const dispatch = jest.fn();
      const result = mapDispatchToProps(dispatch);
      expect(result.handleChangeTimeFrame).toBeDefined();
    });

    it('should dispatch handleChangeTimeFrame when called', () => {
      const dispatch = jest.fn();
      const result = mapDispatchToProps(dispatch);
      const tf = 1;
      result.handleChangeTimeFrame(null, tf);
      expect(dispatch).toHaveBeenCalledWith(changeTimeFrame(tf));
    });
  });
});

describe('handleSubmit', () => {
  it('should be injected', () => {
    const dispatch = jest.fn();
    const result = mapDispatchToProps(dispatch);
    expect(result.handleSubmit).toBeDefined();
  });

  it('should dispatch selectSymbol when called', () => {
    const dispatch = jest.fn();
    const result = mapDispatchToProps(dispatch);
    result.handleSubmit();
    expect(dispatch).toHaveBeenCalledWith(selectSymbol());
  });

  it('should preventDefault if called with event', () => {
    const preventDefault = jest.fn();
    const result = mapDispatchToProps(() => {});
    const evt = { preventDefault };
    result.handleSubmit(evt);
    expect(preventDefault).toHaveBeenCalledWith();
  });
});
