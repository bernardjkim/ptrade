import { call, put, select, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { LOAD_STOCK_DATA } from './constants';
import { stockDataLoaded, stockDataLoadingError } from './actions';
import { makeSelectSymbol } from './selectors';

/**
 * Github repos request/response handler
 */
export function* getStockData() {
  // Select symbol from store
  const symbol = yield select(makeSelectSymbol());
  const requestURL = `https://api.iextrading.com/1.0/stock/${symbol}/chart/1d?chartInterval=5`;
  try {
    // Call our request helper (see 'utils/request')
    const repos = yield call(request, requestURL);
    yield put(stockDataLoaded(repos, symbol));
  } catch (err) {
    yield put(stockDataLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* stockData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(LOAD_STOCK_DATA, getStockData);
}
