import React from 'react';
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import LineChart from './components/LineChart'

const styles = theme => ({
    container: {
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    paper: {
        height: '80%',
        width: '75%',
        marginTop: theme.spacing.unit,
        marginLeft: theme.spacing.unit * 2,
        display: 'flex',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px`,
    },
});

const Dashboard = ({ classes, data }) => (
    <div className={classes.container}>
        <Paper className={classes.paper} elevation={1}>
            <LineChart data={data} />
        </Paper>
    </div>
);
Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);