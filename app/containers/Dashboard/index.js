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

import SimpleLineChart from 'components/SimpleLineChart';
import TopBar from 'components/TopBar';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import makeSelectDashboard, {
  makeSelectSymbol,
  makeSelectTimeFrame,
  makeSelectStockData,
  makeSelectLoading,
  makeSelectError,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
import { changeSearch, changeTimeFrame, loadStockData } from './actions';
import ContainerCharts from './components/ContainerCharts';
import ContainerLeft from './components/ContainerLeft';
import ContainerRight from './components/ContainerRight';
import StyledPaper from './components/StyledPaper';
import ChartTabs from '../../components/ChartTabs';

/* eslint-disable react/prefer-stateless-function */
export class Dashboard extends React.PureComponent {
  componentDidMount() {}

  componentDidUpdate(prevProps) {
    if (this.props.timeFrame !== prevProps.timeFrame) {
      this.props.handleSubmit();
    }
  }

  render() {
    // state variables
    const { loading, error, stockData, timeFrame, search } = this.props;

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
          search={search}
          handleSubmit={handleSubmit}
          handleChange={handleChangeSearch}
        />
        <ContainerCharts>
          <ContainerLeft>
            <SimpleLineChart loading={loading} error={error} data={stockData} />
            <ChartTabs
              changeTimeFrame={handleChangeTimeFrame}
              timeFrame={timeFrame}
            />
          </ContainerLeft>
          <ContainerRight>
            <StyledPaper>Right</StyledPaper>
          </ContainerRight>
        </ContainerCharts>
      </div>
    );
  }
}

Dashboard.propTypes = {
  search: PropTypes.string,
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  stockData: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  timeFrame: PropTypes.number,
  handleChangeSearch: PropTypes.func.isRequired,
  handleChangeTimeFrame: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  dashboard: makeSelectDashboard(),
  timeFrame: makeSelectTimeFrame(),
  stockData: makeSelectStockData(),
  symbol: makeSelectSymbol(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

export function mapDispatchToProps(dispatch) {
  return {
    handleChangeSearch: evt => dispatch(changeSearch(evt.target.value)),
    handleChangeTimeFrame: (_, tf) => {
      dispatch(changeTimeFrame(tf));
    },
    handleSubmit: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadStockData());
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
