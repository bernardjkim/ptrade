import React from 'react';
import PropTypes from 'prop-types';

import CartesianGrid from 'recharts/lib/cartesian/CartesianGrid';
import Legend from 'recharts/lib/component/Legend';
import Line from 'recharts/lib/cartesian/Line';
import LineChart from 'recharts/lib/chart/LineChart';
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
import Tooltip from 'recharts/lib/component/Tooltip';
import XAxis from 'recharts/lib/cartesian/XAxis';
import YAxis from 'recharts/lib/cartesian/YAxis';

const SimpleLineChart = ({ data }) => (
    /* 99% per https://github.com/recharts/recharts/issues/172 */
    <ResponsiveContainer width="99%" height="99%">
        <LineChart data={data}>
            <XAxis dataKey="date" />
            <YAxis type="number" width={70} domain={['dataMin', 'dataMax']} />
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#82ca9d" />
        </LineChart>
    </ResponsiveContainer>
);
SimpleLineChart.propTypes = {
    data: PropTypes.array.isRequired,
};

export default SimpleLineChart;
