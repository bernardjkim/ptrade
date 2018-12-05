/**
 * Test the parseChart function
 */
import { parseChart } from '../chart';

describe('parseChart', () => {
  it('should parse oneDay chart correctly', () => {
    const oneDay = true;
    const expected = [
      { date: '09:30', value: 100 },
      { date: '09:35', value: 101 },
    ];
    const chart = [
      { minute: '09:30', marketAverage: 100 },
      { minute: '09:35', marketAverage: 101 },
    ];
    expect(parseChart(chart, oneDay)).toEqual(expected);
  });
  it('should parse !oneDay chart correctly', () => {
    const oneDay = false;
    const expected = [
      { date: 'Oct 01 2018', value: 100 },
      { date: 'Oct 02 2018', value: 101 },
    ];
    const chart = [
      { date: '2018-10-01', close: 100 },
      { date: '2018-10-02', close: 101 },
    ];
    expect(parseChart(chart, oneDay)).toEqual(expected);
  });
});
