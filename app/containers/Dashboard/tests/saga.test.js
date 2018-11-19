/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { all, put, takeLatest } from 'redux-saga/effects';
import { LOAD_CHART, LOAD_QUOTE, REQUEST_TRADE } from '../constants';
import {
  chartLoaded,
  chartLoadingError,
  quoteLoaded,
  quoteLoadingError,
  requestTradeSuccess,
  requestTradeError,
} from '../actions';
import dashboard, { getChart, getQuote, requestTrade } from '../saga';

const token = 'token';
const id = 1;
const symbol = 'AAPL';
const shares = 5;

describe('getChart Saga', () => {
  let getChartGenerator;

  // We have to test twice, once for a successful load and once for an unsuccessful one
  // so we do all the stuff that happens beforehand automatically in the beforeEach
  beforeEach(() => {
    getChartGenerator = getChart();

    const selectDescriptor = getChartGenerator.next().value;
    expect(selectDescriptor).toMatchSnapshot();

    const callDescriptor = getChartGenerator.next(symbol).value;
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

    getChartGenerator.next(timeFrame);
    const putDescriptor = getChartGenerator.next(data).value;
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

    getChartGenerator.next(timeFrame);
    const putDescriptor = getChartGenerator.next(data).value;
    expect(putDescriptor).toEqual(put(chartLoaded(response)));
  });

  it('should call the chartLoadingError action if the response errors', () => {
    const timeFrame = 0;
    const response = new Error('Some error');

    getChartGenerator.next(timeFrame);
    const putDescriptor = getChartGenerator.throw(response).value;
    expect(putDescriptor).toEqual(put(chartLoadingError(response)));
  });
});

describe('getQuote Saga', () => {
  let getQuoteGenerator;

  // We have to test twice, once for a successful load and once for an unsuccessful one
  // so we do all the stuff that happens beforehand automatically in the beforeEach
  beforeEach(() => {
    getQuoteGenerator = getQuote();

    const selectDescriptor = getQuoteGenerator.next().value;
    expect(selectDescriptor).toMatchSnapshot();

    const callDescriptor = getQuoteGenerator.next(symbol).value;
    expect(callDescriptor).toMatchSnapshot();
  });

  it('requests the quote successfully', () => {
    const response = { quote: {} };
    const data = { quote: {} };
    const putDescriptor = getQuoteGenerator.next(data).value;
    expect(putDescriptor).toEqual(put(quoteLoaded(response)));
  });

  it('should call the chartLoadingError action if the response errors', () => {
    const response = new Error('Some error');
    const putDescriptor = getQuoteGenerator.throw(response).value;
    expect(putDescriptor).toEqual(put(quoteLoadingError(response)));
  });
});

describe('new trade Saga', () => {
  let newTradeGenerator;

  // We have to test twice, once for a successful load and once for an unsuccessful one
  // so we do all the stuff that happens beforehand automatically in the beforeEach
  beforeEach(() => {
    newTradeGenerator = requestTrade();

    const selectDescriptor = newTradeGenerator.next().value;
    expect(selectDescriptor).toMatchSnapshot();

    newTradeGenerator.next(token);
    newTradeGenerator.next(id);
    newTradeGenerator.next(symbol);
    const callDescriptor = newTradeGenerator.next(shares).value;
    expect(callDescriptor).toMatchSnapshot();
  });

  it('request new trade order successfully', () => {
    const putDescriptor = newTradeGenerator.next().value;
    expect(putDescriptor).toEqual(put(requestTradeSuccess()));
  });

  it('should call the chartLoadingError action if the response errors', () => {
    const response = new Error('Some error');
    const putDescriptor = newTradeGenerator.throw(response).value;
    expect(putDescriptor).toEqual(put(requestTradeError(response)));
  });
});

describe('Saga', () => {
  const dashboardSaga = dashboard();

  it('should start task to watch for api request actions', () => {
    const takeLatestDescriptor = dashboardSaga.next().value;
    expect(takeLatestDescriptor).toEqual(
      all([
        takeLatest(LOAD_CHART, getChart),
        takeLatest(LOAD_QUOTE, getQuote),
        takeLatest(REQUEST_TRADE, requestTrade),
      ]),
    );
  });
});
