/**
 * Test function calls to IEX api endpoints
 */
import { getChart } from '../iex';

describe('getChart', () => {
  it('should get the correct api endpoint', () => {
    const symbol = 'AAPL';
    const timeFrame = 0;
    const expected = `${
      process.env.IEX_URL
    }/${symbol}/chart/1d?chartInterval=5`;
    expect(getChart(timeFrame, symbol)).toEqual(expected);
  });
  it('should get the correct api endpoint', () => {
    const symbol = 'MSFT';
    const timeFrame = 1;
    const expected = `${process.env.IEX_URL}/${symbol}/chart/1m`;
    expect(getChart(timeFrame, symbol)).toEqual(expected);
  });
});
