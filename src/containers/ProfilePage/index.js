import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import qs from 'qs';
import { timeFormat, timeParse } from 'd3';

import { signout, validate } from 'redux/actions';
import * as auth from 'system/auth';

import LinearProgress from '@material-ui/core/LinearProgress';

import ProfilePage from './ProfilePage';

// this function takes an array of transactions and returns an array with
// the number of current shares for each stock.
function calculateShares(data) {
    let newData = {};

    // get current number of shares for each stock
    data.forEach(({ stock, transaction }) => {
        let { symbol } = stock;
        let { stock_id, price, quantity } = transaction;
        if (!(stock_id in newData)) {
            newData[stock_id] = { symbol: symbol, quantity: quantity, pps: price, };
        } else {
            let prevQty = newData[stock_id]['quantity'];
            newData[stock_id]['quantity'] = prevQty + quantity;
        }
    });
    return newData;
}

// this function takes an array containing the number of shares for each stock
// and calculates and returns the total value of the portfolio.
function calculatePortfolioValue(data) {
    // get total portfolio value
    let portfolioValue = 0;
    Object.keys(data).forEach(key => {
        let pps = data[key]['pps'];
        let qty = data[key]['quantity'];
        portfolioValue = portfolioValue + (pps * qty);
    })
    return portfolioValue;
}

function fillHistory(date, value) {
    // add empty data points for missing data
    // const formatTime = timeFormat("%Y-%m-%d");
    const today = new Date();
    const fiveYearsAgo = new Date(today.getFullYear() - 5, today.getMonth(), today.getDate());
    var diff = Math.round((date - fiveYearsAgo) / (1000 * 60 * 60 * 24));
    var filler = [];
    var current = fiveYearsAgo;
    for (var i = 0; i < diff; i++) {
        filler.push({ date: current, value: value });
        current.setDate(current.getDate() + 1);
    }
    return filler;
}

// function formatDate(data, date, interval) {
function formatDate(data, interval) {
    const formatTime = timeFormat("%b %d %Y");
    let newData = data
        .filter((d, i) => (i % interval === 0))
        .map(d => ({ date: formatTime(d.date), value: d.value, }));
    return newData;
}

function calculateWalletHistory(data) {
    // const formatTime = timeFormat("%Y-%m-%d");
    const parseTime = timeParse("%Y-%m-%dT%H:%M:%SZ");
    var value = 0;
    let filler = fillHistory(parseTime(data[0].date), data[0].value);
    let newData = data.map((d) => {
        value = value + d.value;
        return { date: parseTime(d.date), value: value };
    });
    newData = filler.concat(newData);
    return formatDate(newData, 31);
}

function calculateWalletValue(data) {

}

const mapDispatchToProps = dispatch => {
    return {
        signout: () => dispatch(signout()),
        validate: () => dispatch(validate()),
    };
};
const mapStateToProps = state => ({
    user: state.user,
});
class Index extends React.Component {
    constructor() {
        super();
        this.state = {
            amount: 0,  // withdraw/deposit amount

            bankingTrasactions: [],
            walletHistory: [],
            walletValue: 0,

            stockTransactions: [],
            portfolioData: {},
            portfolioValue: 0,
        };
    }

    componentWillMount() {
        this.props.validate();
    }

    componentDidUpdate(prevProps) {
        // Don't forget to compare to prev props, o.w. infinite loop?
        if (this.props.user.isAuthenticated && prevProps.user !== this.props.user) {
            this.getStockTransactions();
            this.getBankingTransactions();
        }
    }

    changeDepositAmount = event => {
        // TOOD: deposit request validation
        this.setState({ amount: event.target.value });
    }

    changeWithdrawAmount = event => {
        // TOOD: withdraw request validation
        this.setState({ amount: -event.target.value });
    }

    createBankingTransaction = () => {
        const createTransactionRequest = {
            method: 'POST',
            headers: { 'Session-Token': auth.getCookie('api.ptrade.com') },
            url: process.env.API_URL + '/users/' + this.props.user.id + '/bankingtransactions',
            data: qs.stringify({ value: this.state.amount }),
        }
        axios(createTransactionRequest)
            .then((response) => {
                console.log(response);
                this.getBankingTransactions();
            })
            .catch((error) => { console.log(error); });
    }

    // Send a GET request for a list of stock transactions made by the specified user id.
    getStockTransactions = () => {
        const getTransactionsRequest = {
            method: 'GET',
            headers: { 'Session-Token': auth.getCookie('api.ptrade.com') },
            url: process.env.API_URL + '/users/' + this.props.user.id + '/stocktransactions',
        }
        axios(getTransactionsRequest)
            .then((response) => {
                let data = calculateShares(response.data);
                let value = calculatePortfolioValue(data);
                this.setState({ stockTransactions: response.data, portfolioData: data, portfolioValue: value });
            })
            .catch((error) => { console.log(error); });
    }

    // Send a GET request for a list of banking transactions made by the specified user id.
    getBankingTransactions = () => {
        const getTransactionsRequest = {
            method: 'GET',
            headers: { 'Session-Token': auth.getCookie('api.ptrade.com') },
            url: process.env.API_URL + '/users/' + this.props.user.id + '/bankingtransactions',
        }
        axios(getTransactionsRequest)
            .then((response) => {
                let history = calculateWalletHistory(response.data);
                let value = history[history.length - 1]['amount'];
                this.setState({ bankingTransactions: response.data, walletHistory: history, walletValue: value });
            })
            .catch((error) => { console.log(error); });
    }

    render() {
        const { user } = this.props;

        if (user.fetching) {
            return <LinearProgress />
        }

        if (user.isAuthenticated === false) {
            return <Redirect to="/signin" />
        }

        return (
            <ProfilePage {...this.props} {...this.state}
                changeDeposit={this.changeDepositAmount}
                changeWithdraw={this.changeWithdrawAmount}
                submitTransaction={this.createBankingTransaction}
            />
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Index);