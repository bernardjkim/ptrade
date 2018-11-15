import { all, takeLatest, call, put, select } from 'redux-saga/effects';
import { urlGetBalance, urlGetPositions, urlGetChart } from 'api/api';
import request from 'utils/request';
import { getIdFromToken } from 'utils/jwt';
import { makeSelectToken } from 'containers/App/selectors';
import { parseUserChart } from 'utils/chart';
import {
  loadBalanceSuccess,
  loadBalanceError,
  loadPositionsError,
  loadPositionsSuccess,
  loadChartSuccess,
  loadChartError,
} from './actions';
import { LOAD_BALANCE, LOAD_POSITIONS, LOAD_CHART } from './constants';

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

  // get desired url for given timeFrame and symbol
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

  // get desired url for given timeFrame and symbol
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

  // get desired url for given timeFrame and symbol
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

// Individual exports for testing
export default function* profilePageSaga() {
  yield all([
    takeLatest(LOAD_BALANCE, getBalance),
    takeLatest(LOAD_POSITIONS, getPositions),
    takeLatest(LOAD_CHART, getChart),
  ]);
}
