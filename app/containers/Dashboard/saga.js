import { call, put, select, takeLatest } from 'redux-saga/effects';
import { getChart } from 'api/iex';
import request from 'utils/request';
import { parseData } from 'utils/stockData';
import { LOAD_STOCK_DATA } from './constants';
import { stockDataLoaded, stockDataLoadingError } from './actions';
import { makeSelectSymbol, makeSelectTimeFrame } from './selectors';

/**
 * stock data request/response handler
 */
export function* getStockData() {
  // Select symbol from store
  const symbol = yield select(makeSelectSymbol());
  if (!symbol) return;

  // Select timeFrame from store
  const tf = yield select(makeSelectTimeFrame());
  if (tf < 0 || tf > 4) return;

  // get desired url for given timeFrame and symbol
  const requestURL = getChart(tf, symbol);
  if (requestURL === '') return;

  try {
    // Call our request helper (see 'utils/request')
    const data = yield call(request, requestURL);

    yield put(stockDataLoaded(parseData(data, tf === 0), symbol));
  } catch (err) {
    yield put(stockDataLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* stockData() {
  // Watches for LOAD_STOCK_DATA actions and calls getStockData when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(LOAD_STOCK_DATA, getStockData);
}
