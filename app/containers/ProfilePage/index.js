/**
 *
 * ProfilePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';

import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { ProfileLink, DashboardLink } from 'components/Links/index';
import { makeSelectToken } from 'containers/App/selectors';
import { loadToken, deleteSession } from 'containers/App/actions';

import SimpleLineChart from 'components/SimpleLineChart';
import ChartTabs from 'components/ChartTabs';
import UserMenu from 'components/UserMenu';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import saga from './saga';
import reducer from './reducer';
import makeSelectProfilePage, {
  makeSelectLoading,
  makeSelectError,
  makeSelectBalance,
  makeSelectPositions,
  makeSelectTimeFrame,
  makeSelectChart,
  makeSelectTotalInvested,
} from './selectors';

import {
  loadBalance,
  changeTimeFrame,
  loadChart,
  loadPositions,
} from './actions';

import ContainerCharts from './components/ContainerCharts';
import ContainerLeft from './components/ContainerLeft';
import ContainerRight from './components/ContainerRight';
import ContainerQuote from './components/ContainerQuote';
import StyledTable from './components/StyledTable';
import StyledAppBar from './components/StyledAppBar';
import Grow from './components/Grow';

/* eslint-disable react/prefer-stateless-function */
export class ProfilePage extends React.Component {
  componentDidMount() {
    // check if token is already stored in storage
    if (!this.props.token) {
      this.props.getToken();
    } else {
      this.props.updateChart();
      this.props.updateBalance();
      this.props.updatePositions();
    }
  }

  componentDidUpdate(prevProps) {
    // if (this.props.timeFrame !== prevProps.timeFrame) {
    //   this.props.updateChart();
    // }

    // update user chart/balance/positions if authenticated
    if (this.props.token !== '' && this.props.token !== prevProps.token) {
      this.props.updateChart();
      this.props.updateBalance();
      this.props.updatePositions();
    }
  }

  render() {
    // state variables
    const {
      loading,
      error,
      chart,
      balance,
      positions,
      totalInvested,
      timeFrame,
      token,
    } = this.props;

    // handler functions
    const { deleteToken, handleChangeTimeFrame } = this.props;

    // token will be an empty string only after failing to load token
    if (token === '') {
      return <Redirect to="/signin" />;
    }

    return (
      <div>
        <StyledAppBar position="static" color="inherit">
          <Toolbar>
            <Typography color="inherit" component={DashboardLink}>
              PTrade
            </Typography>
            <Grow />
            <UserMenu handleSignout={deleteToken} profileLink={ProfileLink} />
          </Toolbar>
        </StyledAppBar>
        <ContainerCharts>
          <ContainerLeft>
            <SimpleLineChart loading={loading} error={error} data={chart} />
            <ChartTabs
              changeTimeFrame={handleChangeTimeFrame}
              timeFrame={timeFrame}
            />
          </ContainerLeft>
          <ContainerRight>
            <ContainerQuote>
              <Typography variant="title" gutterBottom>
                {balance &&
                  totalInvested &&
                  `$${(balance + totalInvested).toFixed(2)}`}
              </Typography>
              <StyledTable>
                <TableHead>
                  <TableRow>
                    <React.Fragment>
                      <TableCell>Balance</TableCell>
                      <TableCell numeric>
                        {balance && `$${balance.toFixed(2)}`}
                      </TableCell>
                    </React.Fragment>
                  </TableRow>
                  <TableRow>
                    <React.Fragment>
                      <TableCell>Invested</TableCell>
                      <TableCell numeric>
                        {totalInvested && `$${totalInvested.toFixed(2)}`}
                      </TableCell>
                    </React.Fragment>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {positions &&
                    positions.map(p => (
                      <TableRow key={p.symbol}>
                        <TableCell component="th" scope="row" variant="head">
                          {`${p.symbol} (${p.shares})`}
                        </TableCell>
                        <TableCell component="td" scope="row" numeric>
                          {`$${p.price_per_share.toFixed(2)}`}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </StyledTable>
            </ContainerQuote>
          </ContainerRight>
        </ContainerCharts>
      </div>
    );
  }
}

ProfilePage.propTypes = {
  // state variables
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  token: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  balance: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  totalInvested: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  chart: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  positions: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  timeFrame: PropTypes.number,

  // dispatch functions
  getToken: PropTypes.func.isRequired,
  deleteToken: PropTypes.func.isRequired,
  handleChangeTimeFrame: PropTypes.func.isRequired,
  updateChart: PropTypes.func.isRequired,
  updateBalance: PropTypes.func.isRequired,
  updatePositions: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  profilePage: makeSelectProfilePage(),
  token: makeSelectToken(),
  timeFrame: makeSelectTimeFrame(),
  balance: makeSelectBalance(),
  positions: makeSelectPositions(),
  chart: makeSelectChart(),
  totalInvested: makeSelectTotalInvested(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

function mapDispatchToProps(dispatch) {
  return {
    getToken: () => {
      dispatch(loadToken());
    },
    deleteToken: () => {
      dispatch(deleteSession());
    },

    handleChangeTimeFrame: (_, tf) => {
      dispatch(changeTimeFrame(tf));
    },

    updateChart: () => {
      dispatch(loadChart());
    },

    updateBalance: () => {
      dispatch(loadBalance());
    },

    updatePositions: () => {
      dispatch(loadPositions());
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'profilePage', reducer });
const withSaga = injectSaga({ key: 'profilePage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(ProfilePage);
