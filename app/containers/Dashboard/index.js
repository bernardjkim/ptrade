/**
 *
 * Dashboard
 *
 * Dashboard page allows the user to search for specific stock symbols and view
 * the charts.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import Button from '@material-ui/core/Button';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { SigninLink, ProfileLink } from 'components/Links/index';
import ChartTabs from 'components/ChartTabs';
import SimpleLineChart from 'components/SimpleLineChart';
import SearchBar from 'components/SearchBar';
import UserMenu from 'components/UserMenu';
import ButtonModal from 'components/ButtonModal';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { formatQuote } from 'utils/quote';

import { makeSelectToken } from 'containers/App/selectors';
import { loadToken, deleteSession } from 'containers/App/actions';

import makeSelectDashboard, {
  makeSelectSearch,
  makeSelectTimeFrame,
  makeSelectChart,
  makeSelectQuote,
  makeSelectLoading,
  makeSelectError,
  makeSelectSymbol,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import {
  changeSearch,
  changeTimeFrame,
  loadChart,
  loadQuote,
  selectSymbol,
  changeTradeQuantity,
  requestTrade,
} from './actions';
import ContainerCharts from './components/ContainerCharts';
import ContainerLeft from './components/ContainerLeft';
import ContainerRight from './components/ContainerRight';
import ContainerQuote from './components/ContainerQuote';
import StyledTable from './components/StyledTable';
import CompanyName from './components/CompanyName';
import StyledAppBar from './components/StyledAppBar';
import Grow from './components/Grow';
import ContainerButton from './components/ContainerButton';
import ContainerInput from './components/ContainerInput';
import InputQuantity from './components/InputQuantity';
import StyledInput from './components/StyledInput';

/* eslint-disable react/prefer-stateless-function */
export class Dashboard extends React.PureComponent {
  componentDidMount() {
    // check if token is already stored in storage
    if (!this.props.token) {
      this.props.getToken();
    }
  }

  componentDidUpdate(prevProps) {
    // update chart if time frame changes
    if (this.props.timeFrame !== prevProps.timeFrame) {
      this.props.updateChart();
    }

    // update chart if selected symbol changes
    if (this.props.symbol !== prevProps.symbol) {
      this.props.updateChart();
      this.props.updateQuote();
    }
  }

  onSubmitTrade = evt => {
    evt.preventDefault();
    this.modalBuy.handleClose();
    this.modalSell.handleClose();
    this.props.submitTrade();
  };

  setRefBuy = ref => {
    this.modalBuy = ref;
  };

  setRefSell = ref => {
    this.modalSell = ref;
  };

  render() {
    // state variables
    const {
      loading,
      error,
      chart,
      quote,
      timeFrame,
      search,
      token,
      // symbol,
    } = this.props;

    // handler functions
    const {
      deleteToken,
      handleChangeSearch,
      handleChangeTimeFrame,
      handleSubmit,
      // submitTrade,
      changeBuyQty,
      changeSellQty,
    } = this.props;

    return (
      <div>
        <Helmet>
          <title>Dashboard</title>
          <meta name="description" content="Description of Dashboard" />
        </Helmet>

        <StyledAppBar position="static" color="inherit">
          <Toolbar>
            <Typography color="inherit">PTrade</Typography>
            <SearchBar
              search={search}
              handleSubmit={handleSubmit}
              handleChange={handleChangeSearch}
            />
            <Grow />
            {token ? (
              <UserMenu handleSignout={deleteToken} profileLink={ProfileLink} />
            ) : (
              <Button component={SigninLink} color="inherit">
                <Typography color="inherit">Sign in</Typography>
              </Button>
            )}
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
            {quote && (
              <CompanyName variant="title" gutterBottom>
                {quote.companyName}
              </CompanyName>
            )}
            <ContainerQuote>
              <StyledTable>
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
                    <TableRow key={q.name} style={{ height: '40px' }}>
                      <TableCell component="th" scope="row" variant="head">
                        {q.name}
                      </TableCell>
                      <TableCell component="td" scope="row" numeric>
                        {q.value}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </StyledTable>
              {quote && (
                <ContainerButton>
                  <ButtonModal
                    onRef={this.setRefBuy}
                    title="Buy"
                    disabled={!token}
                  >
                    <Typography variant="title" id="modal-title">
                      Buy {quote.symbol}
                      <br />
                      {quote.latestPrice} per share
                    </Typography>
                    <br />

                    <ContainerInput>
                      <Typography>Quantity</Typography>
                      <InputQuantity>
                        <form onSubmit={this.onSubmitTrade}>
                          <StyledInput
                            autoFocus
                            onChange={changeBuyQty}
                            placeholder="0"
                            disableUnderline
                            type="number"
                          />
                        </form>
                      </InputQuantity>
                    </ContainerInput>
                  </ButtonModal>
                  <ButtonModal
                    onRef={this.setRefSell}
                    title="Sell"
                    disabled={!token}
                  >
                    <Typography variant="title" id="modal-title">
                      Sell {quote.symbol}
                      <br />
                      {quote.latestPrice} per share
                    </Typography>
                    <br />

                    <ContainerInput>
                      <Typography>Quantity</Typography>
                      <InputQuantity>
                        <form onSubmit={this.onSubmitTrade}>
                          <StyledInput
                            autoFocus
                            onChange={changeSellQty}
                            placeholder="0"
                            disableUnderline
                            type="number"
                          />
                        </form>
                      </InputQuantity>
                    </ContainerInput>
                  </ButtonModal>
                </ContainerButton>
              )}
            </ContainerQuote>
          </ContainerRight>
        </ContainerCharts>
      </div>
    );
  }
}

Dashboard.propTypes = {
  // state variables
  search: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  symbol: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  chart: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  quote: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  timeFrame: PropTypes.number,
  token: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),

  // dispatch functions
  getToken: PropTypes.func.isRequired,
  deleteToken: PropTypes.func.isRequired,
  handleChangeSearch: PropTypes.func.isRequired,
  handleChangeTimeFrame: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  updateChart: PropTypes.func.isRequired,
  updateQuote: PropTypes.func.isRequired,
  submitTrade: PropTypes.func.isRequired,
  changeBuyQty: PropTypes.func.isRequired,
  changeSellQty: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  dashboard: makeSelectDashboard(),
  token: makeSelectToken(),
  timeFrame: makeSelectTimeFrame(),
  chart: makeSelectChart(),
  quote: makeSelectQuote(),
  search: makeSelectSearch(),
  symbol: makeSelectSymbol(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

export function mapDispatchToProps(dispatch) {
  return {
    getToken: () => {
      dispatch(loadToken());
    },
    deleteToken: () => {
      dispatch(deleteSession());
    },
    handleChangeSearch: evt => {
      dispatch(changeSearch(evt.target.value.toUpperCase()));
    },
    handleChangeTimeFrame: (_, tf) => {
      dispatch(changeTimeFrame(tf));
    },
    handleSubmit: (evt, symbol) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(selectSymbol(symbol));
    },
    updateChart: () => {
      dispatch(loadChart());
    },
    updateQuote: () => {
      dispatch(loadQuote());
    },
    submitTrade: () => {
      dispatch(requestTrade());
    },
    changeBuyQty: evt => {
      dispatch(changeTradeQuantity(evt.target.value));
    },
    changeSellQty: evt => {
      dispatch(changeTradeQuantity(-1 * evt.target.value));
    },
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
