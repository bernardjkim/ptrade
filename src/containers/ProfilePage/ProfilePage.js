import React from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles';

import LineChart from './components/LineChart';
// import TransactionList from './components/TransactionList';
import Portfolio from './components/Portfolio';
// import InfoTable from './components/InfoTable';
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
export const ProfileLink = props => <Link style={{ textDecoration: 'none' }} to="/profile" {...props} />

const ProfilePage = ({ classes, portfolioData, portfolioHistory, portfolioValue, signout, transactions, user }) => (
    <div className={classes.container}>
        <TopBar
            signout={signout}
            user={user}
        />
        <div className={classes.containerCharts}>
            <div className={classes.chartLeft}>
                <LineChart data={portfolioHistory} />
            </div>
            <div className={classes.chartRight}>
                {/* <TransactionList data={data} transactions={transactions} /> */}
                <Portfolio data={portfolioData} portfolioValue={portfolioValue} />
            </div>
        </div>
    </div>
);
ProfilePage.propTypes = {
    classes: PropTypes.object.isRequired,
    // data: PropTypes.object.isRequired,
    signout: PropTypes.func.isRequired,
    transactions: PropTypes.array.isRequired,
    portfolioData: PropTypes.object.isRequired,
    // portfolioHistory: PropTypes.object.isRequired,
    portfolioValue: PropTypes.number.isRequired,
};

export default withStyles(styles)(ProfilePage);