/**
 *
 * Dashboard
 *
 * TODO: description
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import SimpleLineChart from 'components/SimpleLineChart';
import TopBar from 'components/TopBar';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectDashboard from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';
import { changeSearch, loadStockData } from './actions';

import Container from './components/Container';
import StyledPaper from './components/StyledPaper';

/* eslint-disable react/prefer-stateless-function */
export class Dashboard extends React.PureComponent {
  handleSubmit = event => {
    event.preventDefault();
    this.props.handleSubmit();
  };

  render() {
    return (
      <div>
        <Helmet>
          <title>Dashboard</title>
          <meta name="description" content="Description of Dashboard" />
        </Helmet>
        <TopBar
          handleSubmit={this.handleSubmit}
          handleChange={this.props.handleChange}
        />
        <Container>
          <StyledPaper>
            <SimpleLineChart data={[{ value: 1, date: 1 }]} />
          </StyledPaper>
        </Container>
      </div>
    );
  }
}

Dashboard.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  dashboard: makeSelectDashboard(),
});

function mapDispatchToProps(dispatch) {
  return {
    handleChange: evt => dispatch(changeSearch(evt.target.value)),
    handleSubmit: () => dispatch(loadStockData()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'dashboard', reducer });
const withSaga = injectSaga({ key: 'dashboard', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Dashboard);
