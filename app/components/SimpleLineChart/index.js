/**
 *
 * SimpleLineChart
 *
 * A line chart generated using recharts lib.
 */

import React from 'react';
import PropTypes from 'prop-types';

import CartesianGrid from 'recharts/lib/cartesian/CartesianGrid';
import Line from 'recharts/lib/cartesian/Line';
import LineChart from 'recharts/lib/chart/LineChart';
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
import Tooltip from 'recharts/lib/component/Tooltip';
import XAxis from 'recharts/lib/cartesian/XAxis';
import YAxis from 'recharts/lib/cartesian/YAxis';

function SimpleLineChart({ data }) {
  return (
    /* 99% per https://github.com/recharts/recharts/issues/172 */
    <ResponsiveContainer width="99%" height="90%">
      <LineChart data={data || []}>
        <XAxis dataKey="date" />
        <YAxis
          tickFormatter={value => `$${value}`}
          type="number"
          width={70}
          domain={['dataMin', 'dataMax']}
        />
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <Tooltip formatter={value => `$${value}`} />
        {/* <Legend /> */}
        <Line type="monotone" dataKey="value" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  );
}

SimpleLineChart.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
};

export default SimpleLineChart;
