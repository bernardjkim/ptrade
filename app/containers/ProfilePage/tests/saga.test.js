/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { all, takeLatest, put } from 'redux-saga/effects';
import profilePageSaga, {
  getBalance,
  getPositions,
  getChart,
  getTransferRequest,
} from '../saga';
import {
  LOAD_BALANCE,
  LOAD_POSITIONS,
  LOAD_CHART,
  REQUEST_TRANSFER,
} from '../constants';
import {
  loadBalanceSuccess,
  loadBalanceError,
  loadPositionsSuccess,
  loadPositionsError,
  loadChartSuccess,
  loadChartError,
  // requestTransferSuccess,
  // requestTransferError,
} from '../actions';

const generator = profilePageSaga();

const token = 'token';
const id = 1;

describe('getBalance Saga', () => {
  let getBalanceGenerator;

  // We have to test twice, once for a successful load and once for an unsuccessful one
  // so we do all the stuff that happens beforehand automatically in the beforeEach
  beforeEach(() => {
    getBalanceGenerator = getBalance();

    const selectDescriptor = getBalanceGenerator.next().value;
    expect(selectDescriptor).toMatchSnapshot();

    getBalanceGenerator.next(token);
    const callDescriptor = getBalanceGenerator.next(id).value;

    expect(callDescriptor).toMatchSnapshot();
  });

  it('requests the balance successfully', () => {
    const response = 100;
    const putDescriptor = getBalanceGenerator.next({ balance: response }).value;
    expect(putDescriptor).toEqual(put(loadBalanceSuccess(response)));
  });

  it('should call the loadBalanceError action if the response errors', () => {
    const response = new Error('Some error');

    const putDescriptor = getBalanceGenerator.throw(response).value;
    expect(putDescriptor).toEqual(put(loadBalanceError(response)));
  });
});

describe('getPositions Saga', () => {
  let getPositionsGenerator;

  // We have to test twice, once for a successful load and once for an unsuccessful one
  // so we do all the stuff that happens beforehand automatically in the beforeEach
  beforeEach(() => {
    getPositionsGenerator = getPositions();

    const selectDescriptor = getPositionsGenerator.next().value;
    expect(selectDescriptor).toMatchSnapshot();

    getPositionsGenerator.next(token);
    const callDescriptor = getPositionsGenerator.next(id).value;
    expect(callDescriptor).toMatchSnapshot();
  });

  it('requests the chart successfully', () => {
    const response = [];
    const putDescriptor = getPositionsGenerator.next({ positions: response })
      .value;
    expect(putDescriptor).toEqual(put(loadPositionsSuccess(response)));
  });

  it('should call the loadPositionsError action if the response errors', () => {
    const response = new Error('Some error');

    const putDescriptor = getPositionsGenerator.throw(response).value;
    expect(putDescriptor).toEqual(put(loadPositionsError(response)));
  });
});

describe('getChart Saga', () => {
  let getChartGenerator;

  // We have to test twice, once for a successful load and once for an unsuccessful one
  // so we do all the stuff that happens beforehand automatically in the beforeEach
  beforeEach(() => {
    getChartGenerator = getChart();

    const selectDescriptor = getChartGenerator.next().value;
    expect(selectDescriptor).toMatchSnapshot();

    getChartGenerator.next(token);
    const callDescriptor = getChartGenerator.next(id).value;
    expect(callDescriptor).toMatchSnapshot();
  });

  it('requests the chart successfully', () => {
    const response = [];

    const putDescriptor = getChartGenerator.next({ history: response }).value;
    expect(putDescriptor).toEqual(put(loadChartSuccess(response)));
  });

  it('should call the loadChartError action if the response errors', () => {
    const response = new Error('Some error');

    const putDescriptor = getChartGenerator.throw(response).value;
    expect(putDescriptor).toEqual(put(loadChartError(response)));
  });
});

describe('profilePageSaga Saga', () => {
  it('should start task to watch for profile page action', () => {
    const takeLatestDescriptor = generator.next().value;
    expect(takeLatestDescriptor).toEqual(
      all([
        takeLatest(LOAD_BALANCE, getBalance),
        takeLatest(LOAD_POSITIONS, getPositions),
        takeLatest(LOAD_CHART, getChart),
        takeLatest(REQUEST_TRANSFER, getTransferRequest),
      ]),
    );
  });
});
