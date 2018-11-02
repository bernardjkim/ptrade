/**
 * Test the parseData function
 */
import { parseData } from '../stockData';

describe('parseData', () => {
  it('should parse oneDay data correctly', () => {
    const oneDay = true;
    const expected = [
      { date: '09:30', value: 100 },
      { date: '09:35', value: 101 },
    ];
    const data = [
      { minute: '09:30', marketAverage: 100 },
      { minute: '09:35', marketAverage: 101 },
    ];
    expect(parseData(data, oneDay)).toEqual(expected);
  });
  it('should parse !oneDay data correctly', () => {
    const oneDay = false;
    const expected = [
      { date: 'Oct 01 2018', value: 100 },
      { date: 'Oct 02 2018', value: 101 },
    ];
    const data = [
      { date: '2018-10-01', close: 100 },
      { date: '2018-10-02', close: 101 },
    ];
    expect(parseData(data, oneDay)).toEqual(expected);
  });
});
