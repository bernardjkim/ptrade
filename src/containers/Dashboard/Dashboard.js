import React from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

import LineChart from './components/LineChart';
import TradeModal from './components/TradeModal';
import InfoTable from './components/InfoTable';
import TopBar from './components/TopBar';

const styles = theme => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
    },
    containerButton: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-evenly',
        paddingTop: theme.spacing.unit,
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
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    paper: {
        marginTop: theme.spacing.unit,
        display: 'flex',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px`,
    }
});

// Link to dashboard 
export const DashboardLink = props => <Link to="/dashboard" {...props} />

const Dashboard = ({ classes, changeSearch, submitSearch, changeBuyQty,
    changeSellQty, submitTrade, signout, data, quote, user }) => (
        <div className={classes.container}>
            <TopBar
                submitSearch={submitSearch}
                changeSearch={changeSearch}
                signout={signout}
                user={user}
            />
            <div className={classes.containerCharts}>
                <Paper className={`${classes.chartLeft} ${classes.paper}`} elevation={1}>
                    <LineChart data={data} />
                </Paper>
                <Paper className={`${classes.chartRight} ${classes.paper}`} elevation={1}>
                    <InfoTable
                        quote={quote}
                        user={user}
                        submitTrade={submitTrade}
                    />
                    <div className={classes.containerButton}>
                        <TradeModal
                            title="Buy"
                            disabled={!user.isAuthenticated}
                            symbol={quote['symbol']}
                            pps={quote['latestPrice']}
                            handleTrade={submitTrade}
                            handleChange={changeBuyQty}
                        />
                        <TradeModal
                            title="Sell"
                            disabled={!user.isAuthenticated}
                            symbol={quote['symbol']}
                            pps={quote['latestPrice']}
                            handleTrade={submitTrade}
                            handleChange={changeSellQty}
                        />
                    </div>
                </Paper>
            </div>
        </div>
    );
Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
    submitSearch: PropTypes.func.isRequired,
    changeSearch: PropTypes.func.isRequired,
    submitTrade: PropTypes.func.isRequired,
    changeBuyQty: PropTypes.func.isRequired,
    changeSellQty: PropTypes.func.isRequired,
    signout: PropTypes.func.isRequired,
    data: PropTypes.array.isRequired,
    quote: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);