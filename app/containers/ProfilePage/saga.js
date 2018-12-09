import { all, takeLatest, call, put, select } from 'redux-saga/effects';
import qs from 'qs';
import {
  urlGetBalance,
  urlGetPositions,
  urlGetChart,
  urlNewTransfer,
} from 'api/api';
import request from 'utils/request';
import { getIdFromToken } from 'utils/jwt';
import { parseUserChart } from 'utils/chart';
import { makeSelectToken } from 'containers/App/selectors';
import {
  loadBalanceSuccess,
  loadBalanceError,
  loadPositionsError,
  loadPositionsSuccess,
  loadChartSuccess,
  loadChartError,
  requestTransferError,
  requestTransferSuccess,
} from './actions';
import {
  LOAD_BALANCE,
  LOAD_POSITIONS,
  LOAD_CHART,
  REQUEST_TRANSFER,
} from './constants';
import { makeSelectTransferAmount } from './selectors';

/**
 * get balance request/response handler
 */
export function* getBalance() {
  // Select token
  const token = yield select(makeSelectToken());
  if (!token) return;

  // Select user id
  const id = yield getIdFromToken(token);
  if (!id) return;

  // Select timeFrame from store
  // const tf = yield select(makeSelectTimeFrame());
  // if (tf < 0 || tf > 4) return;

  // get desired url
  const requestURL = urlGetBalance(id);
  if (requestURL === '') return;

  // set request method/header/body
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Session-Token': token,
    },
  };

  try {
    // Call our request helper (see 'utils/request')
    const balance = yield call(request, requestURL, options);

    yield put(loadBalanceSuccess(balance.balance));
  } catch (err) {
    yield put(loadBalanceError(err));
  }
}

/**
 * get positions request/response handler
 */
export function* getPositions() {
  // Select token
  const token = yield select(makeSelectToken());
  if (!token) return;

  // Select user id
  const id = yield getIdFromToken(token);
  if (!id) return;

  // Select timeFrame from store
  // const tf = yield select(makeSelectTimeFrame());
  // if (tf < 0 || tf > 4) return;

  // get desired url
  const requestURL = urlGetPositions(id);
  if (requestURL === '') return;

  // set request method/header/body
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Session-Token': token,
    },
  };

  try {
    // Call our request helper (see 'utils/request')
    const positions = yield call(request, requestURL, options);

    yield put(loadPositionsSuccess(positions.positions));
  } catch (err) {
    yield put(loadPositionsError(err));
  }
}

/**
 * get chart request/response handler
 */
export function* getChart() {
  // Select token
  const token = yield select(makeSelectToken());
  if (!token) return;

  // Select user id
  const id = yield getIdFromToken(token);
  if (!id) return;

  // Select timeFrame from store
  // const tf = yield select(makeSelectTimeFrame());
  // if (tf < 0 || tf > 4) return;

  // get desired url
  const requestURL = urlGetChart(id);
  if (requestURL === '') return;

  // set request method/header/body
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Session-Token': token,
    },
  };

  try {
    // Call our request helper (see 'utils/request')
    const chart = yield call(request, requestURL, options);

    yield put(loadChartSuccess(parseUserChart(chart.history)));
  } catch (err) {
    yield put(loadChartError(err));
  }
}

/**
 * get request transfer handler
 */
export function* getTransferRequest() {
  // Select token
  const token = yield select(makeSelectToken());
  if (!token) return;

  // Select user id
  const id = yield getIdFromToken(token);
  if (!id) return;

  // get desired url for given timeFrame and symbol
  const requestURL = urlNewTransfer(id);
  if (requestURL === '') return;

  const transferAmount = yield select(makeSelectTransferAmount());
  if (transferAmount === 0) return;

  // set request method/header/body
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Session-Token': token,
    },
    body: qs.stringify({ balance: transferAmount }),
  };

  try {
    yield call(request, requestURL, options);
    yield put(requestTransferSuccess());
  } catch (err) {
    yield put(requestTransferError(err));
  }
}

// Individual exports for testing
export default function* profilePageSaga() {
  yield all([
    takeLatest(LOAD_BALANCE, getBalance),
    takeLatest(LOAD_POSITIONS, getPositions),
    takeLatest(LOAD_CHART, getChart),
    takeLatest(REQUEST_TRANSFER, getTransferRequest),
  ]);
}
