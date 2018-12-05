import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { getChartURL, getQuoteURL } from 'api/iex';
import { urlNewTrade } from 'api/api';
import request from 'utils/request';
import { parseChart } from 'utils/chart';
import { getIdFromToken } from 'utils/jwt';
import { makeSelectToken } from 'containers/App/selectors';
import qs from 'qs';
import { LOAD_CHART, LOAD_QUOTE, REQUEST_TRADE } from './constants';
import {
  chartLoaded,
  chartLoadingError,
  quoteLoaded,
  quoteLoadingError,
  requestTradeSuccess,
  requestTradeError,
} from './actions';
import {
  makeSelectSymbol,
  makeSelectTimeFrame,
  makeSelectQuantity,
} from './selectors';

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
 * trade request/response handler
 */
export function* requestTrade() {
  const token = yield select(makeSelectToken());
  if (!token) return;

  const id = yield getIdFromToken(token);
  if (!id) return;

  const requestURL = urlNewTrade(id);
  if (requestURL === '') return;

  const symbol = yield select(makeSelectSymbol());
  if (!symbol) return;

  const shares = yield select(makeSelectQuantity());
  if (shares === 0) return;

  // set request method/header/body
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Session-Token': token,
    },
    body: qs.stringify({ symbol, shares }),
  };

  try {
    yield call(request, requestURL, options);
    yield put(requestTradeSuccess());
  } catch (err) {
    yield put(requestTradeError(err));
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
    takeLatest(REQUEST_TRADE, requestTrade),
  ]);
}
