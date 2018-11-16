import { timeFormat, timeParse } from 'd3';

/**
 * Parses the given date
 *
 * @param  {string} data              A date string
 * @param  {string} parseTimeString   Initial date format
 * @param  {string} formatTimeString  Desired date format
 *
 * @return {Date}                     A parsed date
 */
export function parseDate(date, parseTimeString, formatTimeString) {
  const parseTime = timeParse(parseTimeString);
  const formatTime = timeFormat(formatTimeString);
  return formatTime(parseTime(date));
}
