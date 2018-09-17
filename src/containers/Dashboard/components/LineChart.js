import React from 'react';

import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
import LineChart from 'recharts/lib/chart/LineChart';
import Line from 'recharts/lib/cartesian/Line';
import XAxis from 'recharts/lib/cartesian/XAxis';
import YAxis from 'recharts/lib/cartesian/YAxis';
import CartesianGrid from 'recharts/lib/cartesian/CartesianGrid';
import Tooltip from 'recharts/lib/component/Tooltip';
import Legend from 'recharts/lib/component/Legend';

const SimpleLineChart = ({ data }) => (
    // 99% per https://github.com/recharts/recharts/issues/172
    <ResponsiveContainer width="99%" height="99%">
        <LineChart data={data}>
            <XAxis dataKey="date" />
            <YAxis type="number" domain={['dataMin - 1', 'dataMax + 1']} />
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#82ca9d" />
        </LineChart>
    </ResponsiveContainer>
);

export default SimpleLineChart;