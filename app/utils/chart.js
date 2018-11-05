import { parseDate } from './date';
/**
 * Parses the given chart
 *
 * @param  {array}  chart   An array of data points
 * @param  {bool}   oneDay  A bool value indicating if one day data
 *
 * @return {array}         The parsed data
 */
export function parseChart(chart, oneDay) {
  // parse date by hours if oneDay
  if (oneDay) {
    return chart.map(c => ({
      date: parseDate(c.minute, '%H:%M', '%I:%M'),
      value: parseFloat(c.marketAverage.toPrecision(6)),
    }));
  }

  // parse date by days if !oneDay
  return chart.map(c => ({
    date: parseDate(c.date, '%Y-%m-%d', '%b %d %Y'),
    value: parseFloat(c.close.toPrecision(6)),
  }));
}

/**
 * Fill missing data points
 *
 * @param  {array}  chart   An array of data points
 * @param  {number} tf      Time frame index
 *
 * @return {array}          Data with added data points
 */
// export function fillChart(chart, tf) {}
