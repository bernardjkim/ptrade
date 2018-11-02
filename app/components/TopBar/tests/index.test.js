import React from 'react';
import { mount } from 'enzyme';

import TopBar from '../index';

const handleSubmit = () => {};
const handleChange = () => {};
const renderComponent = (props = {}) => mount(<TopBar {...props} />);

describe('<TopBar />', () => {
  it('should render a StyledAppBar', () => {
    const renderedComponent = renderComponent({ handleChange, handleSubmit });
    expect(renderedComponent.find('StyledAppBar')).toHaveLength(1);
  });
});
