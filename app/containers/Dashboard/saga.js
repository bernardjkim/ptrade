import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { getChartURL, getQuoteURL } from 'api/iex';
import request from 'utils/request';
import { parseChart } from 'utils/chart';
import { LOAD_CHART, LOAD_QUOTE } from './constants';
import {
  chartLoaded,
  chartLoadingError,
  quoteLoaded,
  quoteLoadingError,
} from './actions';
import { makeSelectSymbol, makeSelectTimeFrame } from './selectors';

/**
 * stock chart request/response handler
 */
export function* getChart() {
  // Select symbol from store
  const symbol = yield select(makeSelectSymbol());
  if (!symbol) return;

  // Select timeFrame from store
  const tf = yield select(makeSelectTimeFrame());
  if (tf < 0 || tf > 4) return;

  // get desired url for given timeFrame and symbol
  const requestURL = getChartURL(tf, symbol);
  if (requestURL === '') return;

  try {
    // Call our request helper (see 'utils/request')
    const chart = yield call(request, requestURL);

    yield put(chartLoaded(parseChart(chart, tf === 0)));
  } catch (err) {
    yield put(chartLoadingError(err));
  }
}

/**
 * stock quote request/response handler
 */
export function* getQuote() {
  // Select symbol from store
  const symbol = yield select(makeSelectSymbol());
  if (!symbol) return;

  // get desired url for given timeFrame and symbol
  const requestURL = getQuoteURL(symbol);
  if (requestURL === '') return;

  try {
    // Call our request helper (see 'utils/request')
    const quote = yield call(request, requestURL);

    yield put(quoteLoaded(quote));
  } catch (err) {
    yield put(quoteLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* dashboardSaga() {
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield all([
    takeLatest(LOAD_CHART, getChart),
    takeLatest(LOAD_QUOTE, getQuote),
  ]);
}
