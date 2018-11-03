/**
 * Test function calls to IEX api endpoints
 */
import { getChartURL, getQuoteURL } from '../iex';

describe('getChartURL', () => {
  it('should get the correct api endpoint', () => {
    const symbol = 'AAPL';
    const timeFrame = 0;
    const expected = `${
      process.env.IEX_URL
    }/${symbol}/chart/1d?chartInterval=5`;
    expect(getChartURL(timeFrame, symbol)).toEqual(expected);
  });
  it('should get the correct api endpoint', () => {
    const symbol = 'MSFT';
    const timeFrame = 1;
    const expected = `${process.env.IEX_URL}/${symbol}/chart/1m`;
    expect(getChartURL(timeFrame, symbol)).toEqual(expected);
  });
});

describe('getQuoteURL', () => {
  it('should get the correct api endpoint', () => {
    const symbol = 'AAPL';
    const expected = `${process.env.IEX_URL}/${symbol}/quote`;
    expect(getQuoteURL(symbol)).toEqual(expected);
  });
});
