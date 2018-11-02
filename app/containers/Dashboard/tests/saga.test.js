/**
 * Test sagas
 */

/* eslint-disable redux-saga/yield-effects */
import { put, takeLatest } from 'redux-saga/effects';
import { LOAD_STOCK_DATA } from '../constants';
import { stockDataLoaded, stockDataLoadingError } from '../actions';
import stockData, { getStockData } from '../saga';

const symbol = 'AAPL';

describe('getData Saga', () => {
  let getDataGenerator;

  // We have to test twice, once for a successful load and once for an unsuccessful one
  // so we do all the stuff that happens beforehand automatically in the beforeEach
  beforeEach(() => {
    getDataGenerator = getStockData();

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
    expect(putDescriptor).toEqual(put(stockDataLoaded(response, symbol)));
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
    expect(putDescriptor).toEqual(put(stockDataLoaded(response, symbol)));
  });

  it('should call the stockDataLoadingError action if the response errors', () => {
    const timeFrame = 0;
    const response = new Error('Some error');

    getDataGenerator.next(timeFrame);
    const putDescriptor = getDataGenerator.throw(response).value;
    expect(putDescriptor).toEqual(put(stockDataLoadingError(response)));
  });
});

describe('stockDataSaga Saga', () => {
  const stockDataSaga = stockData();

  it('should start task to watch for LOAD_STOCK_DATA action', () => {
    const takeLatestDescriptor = stockDataSaga.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(LOAD_STOCK_DATA, getStockData),
    );
  });
});
