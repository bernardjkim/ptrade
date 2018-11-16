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
    // variables
    const { timeFrame } = this.props;

    // functions
    const { changeTimeFrame } = this.props;

    // list of time frames
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
  // variables
  timeFrame: PropTypes.number,

  // functions
  changeTimeFrame: PropTypes.func,
};

export default ChartTabs;
