import React from 'react';
import { mount } from 'enzyme';

import SearchBar from '../index';

const handleSubmit = () => {};
const handleChange = () => {};
const renderComponent = (props = {}) => mount(<SearchBar {...props} />);

describe('<SearchBar />', () => {
  it('should render a SearchDiv', () => {
    const renderedComponent = renderComponent({ handleChange, handleSubmit });
    expect(renderedComponent.find('SearchDiv')).toHaveLength(1);
  });
});
