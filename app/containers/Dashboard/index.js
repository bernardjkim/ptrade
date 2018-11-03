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

import ChartTabs from 'components/ChartTabs';
import SimpleLineChart from 'components/SimpleLineChart';
import TopBar from 'components/TopBar';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
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
      // symbol,
    } = this.props;

    // handler functions
    const {
      handleChangeSearch,
      handleChangeTimeFrame,
      handleSubmit,
    } = this.props;

    let id = 0;
    function createData(name, value) {
      id += 1;
      return { id, name, value };
    }

    const data = q => [
      createData('OPEN', q.open ? `$${q.open}` : 'N/A'),
      createData('CLOSE', q.close ? `$${q.close}` : 'N/A'),
      createData('HIGH', q.high ? `$${q.high}` : 'N/A'),
      createData('LOW', q.low ? `$${q.low}` : 'N/A'),
      createData('52 WK HIGH', q.week52High ? `$${q.week52High}` : 'N/A'),
      createData('52 WK LOW', q.week52Low ? `$${q.week52Low}` : 'N/A'),
      createData('AVG VOL', q.avgTotalVolume ? q.avgTotalVolume : 'N/A'),
      createData('MKT CAP', q.marketCap ? q.marketCap : 'N/A'),
    ];

    return (
      <div>
        <Helmet>
          <title>Dashboard</title>
          <meta name="description" content="Description of Dashboard" />
        </Helmet>
        <TopBar
          search={search}
          handleSubmit={handleSubmit}
          handleChange={handleChangeSearch}
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
            <ContainerQuote>
              <StyledTable>
                <TableHead>
                  <TableRow>
                    <TableCell>{quote.symbol ? quote.symbol : 'N/A'}</TableCell>
                    <TableCell numeric>
                      {quote.latestPrice ? `$${quote.latestPrice}` : 'N/A'}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data(quote).map(n => (
                    <TableRow key={n.id}>
                      <TableCell component="th" scope="row" variant="head">
                        {n.name}
                      </TableCell>
                      <TableCell component="td" scope="row" numeric>
                        {n.value}
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

  // dispatch functions
  handleChangeSearch: PropTypes.func.isRequired,
  handleChangeTimeFrame: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  updateChart: PropTypes.func.isRequired,
  updateQuote: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  dashboard: makeSelectDashboard(),
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
