/**
 *
 * Dashboard
 *
 * TODO: description
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
// import Typography from '@material-ui/core/Typography';

import { SigninLink } from 'containers/SigninPage/index';

import ChartTabs from 'components/ChartTabs';
import SimpleLineChart from 'components/SimpleLineChart';
import TopBar from 'components/TopBar';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import { formatQuote } from 'utils/quote';

import { makeSelectToken } from 'containers/App/selectors';
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
} from './actions';
import ContainerCharts from './components/ContainerCharts';
import ContainerLeft from './components/ContainerLeft';
import ContainerRight from './components/ContainerRight';
import ContainerQuote from './components/ContainerQuote';
import StyledTable from './components/StyledTable';
import CompanyName from './components/CompanyName';

/* eslint-disable react/prefer-stateless-function */
export class Dashboard extends React.PureComponent {
  componentDidMount() {}

  componentDidUpdate(prevProps) {
    if (this.props.timeFrame !== prevProps.timeFrame) {
      this.props.updateChart();
    }

    if (this.props.symbol !== prevProps.symbol) {
      this.props.updateChart();
      this.props.updateQuote();
    }
  }

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
      handleChangeSearch,
      handleChangeTimeFrame,
      handleSubmit,
    } = this.props;

    return (
      <div>
        <Helmet>
          <title>Dashboard</title>
          <meta name="description" content="Description of Dashboard" />
        </Helmet>
        <TopBar
          token={token}
          search={search}
          handleSubmit={handleSubmit}
          handleChange={handleChangeSearch}
          handleSignout={() => {}}
          signinLink={SigninLink}
        />
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
              </StyledTable>
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
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  chart: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  quote: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  timeFrame: PropTypes.number,
  token: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),

  // dispatch functions
  handleChangeSearch: PropTypes.func.isRequired,
  handleChangeTimeFrame: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  updateChart: PropTypes.func.isRequired,
  updateQuote: PropTypes.func.isRequired,
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
    handleChangeSearch: evt =>
      dispatch(changeSearch(evt.target.value.toUpperCase())),

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
