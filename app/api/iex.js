/**
 * Return a url formatted with the given time frame and symbol
 *
 * @param  {number} timeFrame   The desired time frame
 * @param  {string} symbol      A stock symbol
 *
 * @return {string}             A iex api endpoint url
 */
export function getChart(timeFrame, symbol) {
  switch (timeFrame) {
    case 0:
      return `${process.env.IEX_URL}/${symbol}/chart/1d?chartInterval=5`;
    case 1:
      return `${process.env.IEX_URL}/${symbol}/chart/1m`;
    case 2:
      return `${process.env.IEX_URL}/${symbol}/chart/6m?chartInterval=7`;
    case 3:
      return `${process.env.IEX_URL}/${symbol}/chart/1y?chartInterval=7`;
    case 4:
      return `${process.env.IEX_URL}/${symbol}/chart/5y?chartInterval=30`;
    default:
      return ``;
  }
}
