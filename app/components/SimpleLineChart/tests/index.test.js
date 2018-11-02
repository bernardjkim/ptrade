import React from 'react';
import { mount } from 'enzyme';

import SimpleLineChart from '../index';

const data = [{ value: 1, date: 1 }, { value: 2, date: 2 }];
const renderComponent = (props = {}) => mount(<SimpleLineChart {...props} />);

describe('<SimpleLineChart />', () => {
  it('should render a ResponsiveContainer', () => {
    const renderedComponent = renderComponent({ data });
    expect(renderedComponent.find('ResponsiveContainer')).toHaveLength(1);
  });
});
