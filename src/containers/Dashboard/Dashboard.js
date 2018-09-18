import React from 'react';
import PropTypes from 'prop-types'

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import LineChart from './components/LineChart';
import InfoTable from './components/InfoTable';
import SearchBar from './components/SearchBar';

const styles = theme => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
    },
    containerCharts: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        paddingTop: '5px',
    },
    chartLeft: {
        width: '65%',
    },
    chartRight: {
        width: '30%',
        minWidth: '400px',
    },
    paper: {
        height: '85vh',
        minHeight: '500px',
        marginTop: theme.spacing.unit,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px`,
    },
});

const Dashboard = ({ classes, data, quote }) => (
    <div className={classes.container}>

        <SearchBar />
        <div className={classes.containerCharts}>
            <Paper className={`${classes.paper} ${classes.chartLeft}`} elevation={1}>
                <LineChart data={data} />
            </Paper>
            <Paper className={`${classes.paper} ${classes.chartRight}`} elevation={1}>
                <InfoTable quote={quote} />
            </Paper>
        </div>
    </div>
);
Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);