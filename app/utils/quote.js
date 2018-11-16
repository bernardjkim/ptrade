/**
 * Format the given quote
 * TODO: Should this be a util funciton? Maybe just a separate component?
 *
 * @param  {object} quote An object containing the stock quote
 *
 * @return {array}        The formatted quote
 */
export function formatQuote(quote) {
  // currently only displaying these rows
  if (!quote) return [];
  return [
    { name: 'OPEN', value: `$${quote.open}` },
    { name: 'CLOSE', value: `$${quote.close}` },
    { name: 'HIGH', value: `$${quote.high}` },
    { name: 'LOW', value: `$${quote.low}` },
    { name: '52 WK HIGH', value: `$${quote.week52High}` },
    { name: '52 WK LOW', value: `$${quote.week52Low}` },
    {
      name: 'CHANGE',
      value: quote.change >= 0 ? `$${quote.change}` : `-$${-1 * quote.change}`,
    },
    {
      name: 'CHANGE %',
      value:
        quote.changePercent >= 0
          ? `%${quote.changePercent}`
          : `-%${-1 * quote.changePercent}`,
    },
    {
      name: 'AVG VOL',
      value: `${(quote.avgTotalVolume / 1000000).toPrecision(4)} M`,
    },
    {
      name: 'MKT CAP',
      value: `${Math.floor(quote.marketCap / 1000000)} M`,
    },
  ];
  // return [
  //   { name: 'OPEN', value: quote.open ? `$${quote.open}` : '' },
  //   { name: 'CLOSE', value: quote.close ? `$${quote.close}` : '' },
  //   { name: 'HIGH', value: quote.high ? `$${quote.high}` : '' },
  //   { name: 'LOW', value: quote.low ? `$${quote.low}` : '' },
  //   {
  //     name: '52 WK HIGH',
  //     value: quote.week52High ? `$${quote.week52High}` : '',
  //   },
  //   { name: '52 WK LOW', value: quote.week52Low ? `$${quote.week52Low}` : '' },
  //   {
  //     name: 'AVG VOL',
  //     value: quote.avgTotalVolume ? quote.avgTotalVolume : '',
  //   },
  //   { name: 'MKT CAP', value: quote.marketCap ? quote.marketCap : '' },
  // ];
}
