import React from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TopBar from './components/TopBar';

import LineChart from './components/LineChart';
// import TransactionList from './components/TransactionList';
import Portfolio from './components/Portfolio';
import BankingModal from './components/BankingModal';
import Typography from '@material-ui/core/Typography';

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
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
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
export const ProfileLink = props => <Link style={{ textDecoration: 'none' }} to="/profile" {...props} />

const ProfilePage = ({ classes, portfolioData, portfolioValue,
    signout, user, changeDeposit, changeWithdraw, submitTransaction, walletHistory, walletValue }) => (
        <div className={classes.container}>
            <TopBar
                signout={signout}
                user={user}
            />
            <div className={classes.containerCharts}>
                <Paper className={`${classes.chartLeft} ${classes.paper}`} elevation={1}>
                    <LineChart data={walletHistory} />
                </Paper>
                <Paper className={`${classes.chartRight} ${classes.paper}`} elevation={1}>
                    {/* <TransactionList data={data} transactions={transactions} /> */}
                    <Typography>{walletValue}</Typography>
                    <Portfolio data={portfolioData} portfolioValue={portfolioValue} />
                    <div className={classes.containerButton}>
                        <BankingModal
                            title="Deposit"
                            handleSubmit={submitTransaction}
                            handleChange={changeDeposit}
                        />
                        <BankingModal
                            title="Withdraw"
                            handleSubmit={submitTransaction}
                            handleChange={changeWithdraw}
                        />
                    </div>
                </Paper>
            </div>
        </div>
    );
ProfilePage.propTypes = {
    classes: PropTypes.object.isRequired,
    // data: PropTypes.object.isRequired,
    signout: PropTypes.func.isRequired,
    // transactions: PropTypes.array.isRequired,
    portfolioData: PropTypes.object.isRequired,
    portfolioValue: PropTypes.number.isRequired,

    changeDeposit: PropTypes.func.isRequired,
    changeWithdraw: PropTypes.func.isRequired,
    submitTransaction: PropTypes.func.isRequired,
};

export default withStyles(styles)(ProfilePage);