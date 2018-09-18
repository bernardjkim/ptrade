import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import CartesianGrid from 'recharts/lib/cartesian/CartesianGrid';
import Legend from 'recharts/lib/component/Legend';
import Line from 'recharts/lib/cartesian/Line';
import LineChart from 'recharts/lib/chart/LineChart';
import Paper from '@material-ui/core/Paper';
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
import Tooltip from 'recharts/lib/component/Tooltip';
import XAxis from 'recharts/lib/cartesian/XAxis';
import YAxis from 'recharts/lib/cartesian/YAxis';

const styles = theme => ({
    paper: {
        height: '100%',
        width: '100%',
        marginTop: theme.spacing.unit,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px`,
    },
});
const SimpleLineChart = ({ classes, data }) => (
    <Paper className={classes.paper} elevation={1}>
        {/* 99% per https://github.com/recharts/recharts/issues/172 */}
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
    </Paper>
);
SimpleLineChart.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleLineChart);