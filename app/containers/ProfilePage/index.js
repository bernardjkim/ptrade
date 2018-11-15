/**
 *
 * ProfilePage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Redirect } from 'react-router-dom';

// import TableHead from '@material-ui/core/TableHead';
// import TableBody from '@material-ui/core/TableBody';
// import TableRow from '@material-ui/core/TableRow';
// import TableCell from '@material-ui/core/TableCell';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

// import { SigninLink } from 'components/Links/index';
import { ProfileLink } from 'components/Links/index';
import { makeSelectToken } from 'containers/App/selectors';
import { loadToken, deleteSession } from 'containers/App/actions';

// import TopBar from 'components/TopBar';
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
  makeSelectPortfolioValue,
} from './selectors';

import {
  loadBalance,
  changeTimeFrame,
  loadChart,
  loadPositions,
  setPortfolioValue,
} from './actions';

import ContainerCharts from './components/ContainerCharts';
import ContainerLeft from './components/ContainerLeft';
import ContainerRight from './components/ContainerRight';
import ContainerQuote from './components/ContainerQuote';
// import StyledTable from './components/StyledTable';
// import CompanyName from './components/CompanyName';
import StyledAppBar from './components/StyledAppBar';
import Grow from './components/Grow';

/* eslint-disable react/prefer-stateless-function */
export class ProfilePage extends React.Component {
  componentWillMount() {
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
    if (!this.props.token && this.props.token !== prevProps.token) {
      this.props.updateChart();
      this.props.updateBalance();
      this.props.updatePositions();
    }

    if (
      this.props.balance &&
      this.props.positions &&
      this.props.balance !== prevProps.balance &&
      this.props.positions !== prevProps.positions
    ) {
      this.props.updatePortfolioValue(this.props.balance, this.props.positions);
    }
  }

  render() {
    // state variables
    const {
      loading,
      error,
      chart,
      // balance,
      // positions,
      portfolioValue,
      timeFrame,
      token,
    } = this.props;

    // handler functions
    const { deleteToken, handleChangeTimeFrame } = this.props;

    // TODO: load token does not set loading, so redirects even if token is loading
    if (!token && !loading) {
      return <Redirect to="/signin" />;
    }

    return (
      <div>
        <StyledAppBar position="static" color="inherit">
          <Toolbar>
            <Typography color="inherit">PTrade</Typography>
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
                {portfolioValue && `${portfolioValue.toFixed(2)}`}
              </Typography>
              {/* <StyledTable>
                <TableHead>
                  <TableRow>
                    {quote && (
                      <React.Fragment>
                        <TableCell>
                          {quote.symbol ? quote.symbol : 'N/A'}
                        </TableCell>
                        <TableCell numeric>
                          {quote.latestPrice ? `$${quote.latestPrice}` : 'N/A'}
                        </TableCell>
                      </React.Fragment>
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {formatQuote(quote).map(q => (
                    <TableRow key={q.name}>
                      <TableCell component="th" scope="row" variant="head">
                        {q.name}
                      </TableCell>
                      <TableCell component="td" scope="row" numeric>
                        {q.value}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </StyledTable> */}
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
  chart: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  balance: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  positions: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  portfolioValue: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  timeFrame: PropTypes.number,

  // dispatch functions
  getToken: PropTypes.func.isRequired,
  deleteToken: PropTypes.func.isRequired,
  handleChangeTimeFrame: PropTypes.func.isRequired,
  updateChart: PropTypes.func.isRequired,
  updateBalance: PropTypes.func.isRequired,
  updatePositions: PropTypes.func.isRequired,
  updatePortfolioValue: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  profilePage: makeSelectProfilePage(),
  token: makeSelectToken(),
  timeFrame: makeSelectTimeFrame(),
  balance: makeSelectBalance(),
  positions: makeSelectPositions(),
  chart: makeSelectChart(),
  portfolioValue: makeSelectPortfolioValue(),
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

    updatePortfolioValue: (balance, positions) => {
      let total = balance;
      positions.forEach(p => {
        total += p.shares * p.price_per_share;
      });
      dispatch(setPortfolioValue(total));
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
