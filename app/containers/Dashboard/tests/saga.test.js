/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { all, put, takeLatest } from 'redux-saga/effects';
import { LOAD_CHART, LOAD_QUOTE } from '../constants';
import {
  chartLoaded,
  chartLoadingError,
  quoteLoaded,
  quoteLoadingError,
} from '../actions';
import dashboard, { getChart, getQuote } from '../saga';

const symbol = 'AAPL';

describe('getChart Saga', () => {
  let getDataGenerator;

  // We have to test twice, once for a successful load and once for an unsuccessful one
  // so we do all the stuff that happens beforehand automatically in the beforeEach
  beforeEach(() => {
    getDataGenerator = getChart();

    const selectDescriptor = getDataGenerator.next().value;
    expect(selectDescriptor).toMatchSnapshot();

    const callDescriptor = getDataGenerator.next(symbol).value;
    expect(callDescriptor).toMatchSnapshot();
  });

  it('requests the data successfully with 1d data', () => {
    const timeFrame = 0;
    const response = [
      { date: '09:30', value: 100 },
      { date: '09:35', value: 101 },
    ];
    const data = [
      { minute: '09:30', marketAverage: 100 },
      { minute: '09:35', marketAverage: 101 },
    ];

    getDataGenerator.next(timeFrame);
    const putDescriptor = getDataGenerator.next(data).value;
    expect(putDescriptor).toEqual(put(chartLoaded(response, symbol)));
  });

  it('requests the data successfully with 1m data', () => {
    const timeFrame = 1;
    const response = [
      { date: 'Oct 01 2018', value: 100 },
      { date: 'Oct 02 2018', value: 101 },
    ];
    const data = [
      { date: '2018-10-01', close: 100 },
      { date: '2018-10-02', close: 101 },
    ];

    getDataGenerator.next(timeFrame);
    const putDescriptor = getDataGenerator.next(data).value;
    expect(putDescriptor).toEqual(put(chartLoaded(response)));
  });

  it('should call the chartLoadingError action if the response errors', () => {
    const timeFrame = 0;
    const response = new Error('Some error');

    getDataGenerator.next(timeFrame);
    const putDescriptor = getDataGenerator.throw(response).value;
    expect(putDescriptor).toEqual(put(chartLoadingError(response)));
  });
});

describe('getQuote Saga', () => {
  let getDataGenerator;

  // We have to test twice, once for a successful load and once for an unsuccessful one
  // so we do all the stuff that happens beforehand automatically in the beforeEach
  beforeEach(() => {
    getDataGenerator = getQuote();

    const selectDescriptor = getDataGenerator.next().value;
    expect(selectDescriptor).toMatchSnapshot();

    const callDescriptor = getDataGenerator.next(symbol).value;
    expect(callDescriptor).toMatchSnapshot();
  });

  it('requests the quote successfully', () => {
    const response = { quote: {} };
    const data = { quote: {} };
    const putDescriptor = getDataGenerator.next(data).value;
    expect(putDescriptor).toEqual(put(quoteLoaded(response)));
  });

  it('should call the chartLoadingError action if the response errors', () => {
    const response = new Error('Some error');
    const putDescriptor = getDataGenerator.throw(response).value;
    expect(putDescriptor).toEqual(put(quoteLoadingError(response)));
  });
});

describe('Saga', () => {
  const dashboardSaga = dashboard();

  it('should start task to watch for LOAD_CHART/LOAD_QUOTE action', () => {
    const takeLatestDescriptor = dashboardSaga.next().value;
    expect(takeLatestDescriptor).toEqual(
      all([takeLatest(LOAD_CHART, getChart), takeLatest(LOAD_QUOTE, getQuote)]),
    );
  });
});
