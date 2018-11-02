import React from 'react';
import { mount } from 'enzyme';

import ChartTabs from '../index';

const changeTimeFrame = () => {};
const timeFrame = 0;
const renderComponent = (props = {}) => mount(<ChartTabs {...props} />);

describe('<ChartTabs />', () => {
  it('should render StyledTabs', () => {
    const renderedComponent = renderComponent({ changeTimeFrame, timeFrame });
    expect(renderedComponent.find('StyledTabs')).toHaveLength(1);
  });
});
