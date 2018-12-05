/**
 * Test the formatQuote function
 */
import { formatQuote } from '../quote';

describe('formatQuote', () => {
  it('should format and return the quote correctly', () => {
    const quote = {
      open: 20.59,
      close: 20.23,
      high: 21.06,
      low: 19.47,
      latestPrice: 20.23,
      change: 0.01,
      changePercent: 0.00049,
      avgTotalVolume: 116184509,
      marketCap: 20218007980,
      week52High: 34.14,
      week52Low: 9.04,
    };
    expect(formatQuote(quote)).toMatchSnapshot();
  });
});
