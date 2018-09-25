import React from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles';

// import LineChart from './components/LineChart';
// import TransactionList from './components/TransactionList';
import Portfolio from './components/Portfolio';
// import InfoTable from './components/InfoTable';
// import TopBar from './components/TopBar';

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
export const ProfileLink = props => <Link to="/profile" {...props} />

const ProfilePage = ({ classes, data, transactions, portfolioValue }) => (
    <div className={classes.container}>
        {/* <TopBar
            submitSearch={submitSearch}
            changeSearch={changeSearch}
            signout={signout}
            user={user}
        /> */}
        <div className={classes.containerCharts}>
            <div className={classes.chartLeft}>
                {/* <LineChart data={data} /> */}
            </div>
            <div className={classes.chartRight}>
                {/* <InfoTable quote={quote} user={user} /> */}
                {/* <TransactionList data={data} transactions={transactions} /> */}
                <Portfolio data={data} portfolioValue={portfolioValue} />
            </div>
        </div>
    </div>
);
ProfilePage.propTypes = {
    classes: PropTypes.object.isRequired,
    data: PropTypes.object.isRequired,
    transactions: PropTypes.array.isRequired,
    portfolioValue: PropTypes.number.isRequired,
};

export default withStyles(styles)(ProfilePage);