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
import ButtonModal from 'components/ButtonModal';

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
  changeTimeFrame,
  changeTransferAmount,
  loadBalance,
  loadChart,
  loadPositions,
  requestTransfer,
} from './actions';

import ContainerButton from './components/ContainerButton';
import ContainerCharts from './components/ContainerCharts';
import ContainerInput from './components/ContainerInput';
import ContainerLeft from './components/ContainerLeft';
import ContainerRight from './components/ContainerRight';
import ContainerQuote from './components/ContainerQuote';
import Grow from './components/Grow';
import InputQuantity from './components/InputQuantity';
import StyledAppBar from './components/StyledAppBar';
import StyledInput from './components/StyledInput';
import StyledTable from './components/StyledTable';

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

  onSubmitTransfer = evt => {
    evt.preventDefault();
    this.modalDeposit.handleClose();
    this.modalWithdraw.handleClose();
    this.props.submitTransfer();
  };

  setRefDeposit = ref => {
    this.modalDeposit = ref;
  };

  setRefWithdraw = ref => {
    this.modalWithdraw = ref;
  };

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
    const {
      deleteToken,
      handleChangeTimeFrame,
      changeDeposit,
      changeWithdraw,
    } = this.props;

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
              <ContainerButton>
                <ButtonModal onRef={this.setRefDeposit} title="Deposit">
                  <Typography variant="title" id="modal-title">
                    Deposit
                    <br />
                    Current balance: {balance ? `$${balance.toFixed(2)}` : ''}
                  </Typography>
                  <br />

                  <ContainerInput>
                    <Typography>Amount:</Typography>
                    <InputQuantity>
                      <form onSubmit={this.onSubmitTransfer}>
                        <StyledInput
                          autoFocus
                          onChange={changeDeposit}
                          placeholder="0"
                          disableUnderline
                          type="number"
                        />
                      </form>
                    </InputQuantity>
                  </ContainerInput>
                </ButtonModal>
                <ButtonModal
                  onRef={this.setRefWithdraw}
                  title="withdraw"
                  disabled={!token}
                >
                  <Typography variant="title" id="modal-title">
                    Withdraw
                    <br />
                    Current balance: {balance ? `$${balance.toFixed(2)}` : ''}
                  </Typography>
                  <br />

                  <ContainerInput>
                    <Typography>Withdraw</Typography>
                    <InputQuantity>
                      <form onSubmit={this.onSubmitTransfer}>
                        <StyledInput
                          autoFocus
                          onChange={changeWithdraw}
                          placeholder="0"
                          disableUnderline
                          type="number"
                        />
                      </form>
                    </InputQuantity>
                  </ContainerInput>
                </ButtonModal>
              </ContainerButton>
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
  changeDeposit: PropTypes.func.isRequired,
  changeWithdraw: PropTypes.func.isRequired,
  submitTransfer: PropTypes.func.isRequired,
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
    changeDeposit: evt => {
      dispatch(changeTransferAmount(evt.target.value));
    },
    changeWithdraw: evt => {
      dispatch(changeTransferAmount(-evt.target.value));
    },
    submitTransfer: () => {
      dispatch(requestTransfer());
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
