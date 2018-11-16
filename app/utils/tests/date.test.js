/**
 * Test the parseDate function
 */
import { parseDate } from '../date';

describe('parseDate', () => {
  it('should parse oneDay dates correctly', () => {
    const expected = '03:30';
    expect(parseDate('15:30', '%H:%M', '%I:%M')).toEqual(expected);
  });
  it('should parse !oneDay dates correctly', () => {
    const expected = 'Oct 02 2018';
    expect(parseDate('2018-10-02', '%Y-%m-%d', '%b %d %Y')).toEqual(expected);
  });
});
