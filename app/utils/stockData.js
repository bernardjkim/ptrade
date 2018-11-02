import { parseDate } from './date';
/**
 * Parses the given stockData
 *
 * @param  {array}  data    An array of data points
 * @param  {bool}   oneDay  A bool value indicating if one day data
 *
 * @return {array}         The parsed data
 */
export function parseData(data, oneDay) {
  // parse date by hours if oneDay
  if (oneDay) {
    return data.map(d => ({
      date: parseDate(d.minute, '%H:%M', '%I:%M'),
      value: parseFloat(d.marketAverage.toPrecision(6)),
    }));
  }

  // parse date by days if !oneDay
  return data.map(d => ({
    date: parseDate(d.date, '%Y-%m-%d', '%b %d %Y'),
    value: parseFloat(d.close.toPrecision(6)),
  }));
}
