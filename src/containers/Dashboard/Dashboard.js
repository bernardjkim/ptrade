import React from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles';

import LineChart from './components/LineChart';
import InfoTable from './components/InfoTable';
import TopBar from './components/TopBar';

const styles = theme => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
    },
    containerCharts: {
        height: '90vh',
        minHeight: '600px',
        maxHeight: '800px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        paddingTop: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
    },
    chartLeft: {
        width: '65%',
        minWidth: '800px',
        height: '100%',
    },
    chartRight: {
        width: '30%',
        minWidth: '300px',
        height: '100%',
    },
});

// Link to dashboard 
export const DashboardLink = props => <Link to="/dashboard" {...props} />

const Dashboard = ({ classes, changeSearch, submitSearch, signout, data, quote, user }) => (
    <div className={classes.container}>
        <TopBar
            submitSearch={submitSearch}
            changeSearch={changeSearch}
            signout={signout}
            user={user}
        />
        <div className={classes.containerCharts}>
            <div className={classes.chartLeft}>
                <LineChart data={data} />
            </div>
            <div className={classes.chartRight}>
                <InfoTable quote={quote} user={user} />
            </div>
        </div>
    </div>
);
Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
    submitSearch: PropTypes.func.isRequired,
    changeSearch: PropTypes.func.isRequired,
    signout: PropTypes.func.isRequired,
    data: PropTypes.array.isRequired,
    quote: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);