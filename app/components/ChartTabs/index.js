/**
 *
 * ChartTabs
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import StyledTabs from './StyledTabs';
import StyledTab from './StyledTab';
import Wrapper from './Wrapper';

/* eslint-disable react/prefer-stateless-function */
class ChartTabs extends React.Component {
  render() {
    const { changeTimeFrame, timeFrame } = this.props;
    const labels = ['1d', '1m', '6m', '1y', '5y'];
    return (
      <Wrapper>
        <StyledTabs value={timeFrame} onChange={changeTimeFrame}>
          {labels.map(label => (
            <StyledTab key={label} disableRipple label={label} />
          ))}
        </StyledTabs>
      </Wrapper>
    );
  }
}

ChartTabs.propTypes = {
  changeTimeFrame: PropTypes.func,
  timeFrame: PropTypes.number,
};

export default ChartTabs;
