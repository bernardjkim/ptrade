import React from 'react';
import { shallow } from 'enzyme';

import { Dashboard, mapDispatchToProps } from '../index';
import { changeSearch, changeTimeFrame, loadStockData } from '../actions';

describe('<Dashboard />', () => {
  it('should render the TopBar', () => {
    const renderedComponent = shallow(
      <Dashboard
        handleChangeSearch={() => {}}
        handleSubmit={() => {}}
        handleChangeTimeFrame={() => {}}
      />,
    );
    expect(renderedComponent.find('TopBar').getElement()).toBeDefined();
  });

  it('should render the Container', () => {
    const renderedComponent = shallow(
      <Dashboard
        handleChangeSearch={() => {}}
        handleSubmit={() => {}}
        handleChangeTimeFrame={() => {}}
      />,
    );
    expect(
      renderedComponent.find('ContainerCharts').getElement(),
    ).toBeDefined();
  });
});

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

  it('should dispatch loadStockData when called', () => {
    const dispatch = jest.fn();
    const result = mapDispatchToProps(dispatch);
    result.handleSubmit();
    expect(dispatch).toHaveBeenCalledWith(loadStockData());
  });

  it('should preventDefault if called with event', () => {
    const preventDefault = jest.fn();
    const result = mapDispatchToProps(() => {});
    const evt = { preventDefault };
    result.handleSubmit(evt);
    expect(preventDefault).toHaveBeenCalledWith();
  });
});
