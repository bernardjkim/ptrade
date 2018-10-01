import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { signout, validate } from 'redux/actions';
import { Redirect } from 'react-router-dom';
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
            transactions: [],
            portfolioData: {},
            portfolioHistory: [],
            portfolioValue: 0,
        };
    }

    componentWillMount() {
        this.props.validate();
        // tmp data
        this.setState({
            portfolioHistory: [
                { date: 'Sep 01 2018', value: 20000 },
                { date: 'Sep 02 2018', value: 21000 },
                { date: 'Sep 03 2018', value: 22000 },
                { date: 'Sep 04 2018', value: 19000 },
                { date: 'Sep 05 2018', value: 18000 },
                { date: 'Sep 06 2018', value: 15000 },
                { date: 'Sep 07 2018', value: 20000 },
                { date: 'Sep 08 2018', value: 21000 },
            ]
        });
    }

    componentDidUpdate(prevProps) {
        // Don't forget to compare to prev props, o.w. infinite loop?
        if (this.props.user.isAuthenticated && prevProps.user !== this.props.user) {
            this.getTransactions();
        }
    }

    // Send a GET request for a list of transactions made by the specified user id.
    getTransactions = () => {
        const getTransactionsRequest = {
            method: 'GET',
            headers: { 'Session-Token': auth.getCookie('api.ptrade.com') },
            url: process.env.API_URL + '/users/' + this.props.user.id + '/transactions',
        }
        axios(getTransactionsRequest)
            .then((response) => {
                let data = calculateShares(response.data);
                let value = calculatePortfolioValue(data);
                this.setState({ transactions: response.data, portfolioData: data, portfolioValue: value });
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
            <ProfilePage {...this.props} {...this.state} />
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Index);