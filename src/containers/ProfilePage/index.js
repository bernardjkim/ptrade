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

// function fillHistory(date, value) {
//     // add empty data points for missing data
//     // const formatTime = timeFormat("%Y-%m-%d");
//     const today = new Date();
//     const fiveYearsAgo = new Date(today.getFullYear() - 5, today.getMonth(), today.getDate());
//     var diff = Math.round((date - fiveYearsAgo) / (1000 * 60 * 60 * 24));
//     var filler = [];
//     var current = fiveYearsAgo;
//     for (var i = 0; i < diff; i++) {
//         filler.push({ date: current, value: value });
//         current.setDate(current.getDate() + 1);
//     }
//     return filler;
// }

// // function formatDate(data, date, interval) {
// function formatDate(data, interval) {
//     const formatTime = timeFormat("%b %d %Y");
//     let newData = data
//         .filter((d, i) => (i % interval === 0))
//         .map(d => ({ date: formatTime(d.date), value: d.value, }));
//     return newData;
// }

function formatHistory(history) {
    const parseTime = timeParse("%Y-%m-%dT%H:%M:%SZ");
    const formatTime = timeFormat("%b %d %Y %H:%M");

    let newHistory = history.map(h => (
        {
            date: formatTime(parseTime(h.date)),
            value: Math.round(h.value*100) / 100, 
        }
    ))
    return newHistory;

}

function calcTotalValue(balance, positions) {
    let total = balance;
    positions.forEach((p) => {
        total += p['shares'] * p['price_per_share'];
    })
    return total;
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
            balance: 0, // balance for new transfer order
            timeFrame: 0,

            accountBalance: 0,
            positions: [],

            totalValue: 0,

            portfolioHistory: [],
        };
    }

    componentWillMount() {
        this.props.validate();
    }

    componentDidUpdate(prevProps, prevState) {
        // Don't forget to compare to prev props, o.w. infinite loop?
        if (this.props.user.isAuthenticated && prevProps.user !== this.props.user) {
            this.getAccountBalance();
            this.getAccountPositions();
            this.getPortfolioHistory();
        }

        if (prevState.balance !== this.state.balance || prevState.positions !== this.state.positions) {
            this.setState({ totalValue: calcTotalValue(this.state.accountBalance, this.state.positions) })
        }

        if (this.state.timeFrame !== prevState.timeFrame) {
            this.updateChart();
        }
    }

    updateChart = () => {
        // TODO: enable time frame selection
        // var today = new Date();
        // var data;
        // var date;
        // switch (this.state.timeFrame) {
        //     case 0:
        //         this.setState({ data: this.state.oneDayData });
        //         data = this.state.oneDayData;
        //         break;
        //     case 1:
        //         date = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
        //         data = formatDate(this.state.fiveYearData, date, 1);
        //         break;
        //     case 2:
        //         date = new Date(today.getFullYear(), today.getMonth() - 6, today.getDate());
        //         data = formatDate(this.state.fiveYearData, date, 3);
        //         break;
        //     case 3:
        //         date = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
        //         data = formatDate(this.state.fiveYearData, date, 7);
        //         break;
        //     case 4:
        //         date = new Date(today.getFullYear() - 5, today.getMonth(), today.getDate());
        //         data = formatDate(this.state.fiveYearData, date, 30);
        //         break;
        //     default:
        //         break;
        // }
        // this.setState({ data: data });
    }

    changeTimeFrame = (event, tf) => {
        this.setState({ timeFrame: tf });
    }

    changeDepositAmount = event => {
        // TOOD: deposit request validation
        this.setState({ balance: event.target.value });
    }

    changeWithdrawAmount = event => {
        // TOOD: withdraw request validation
        this.setState({ balance: -event.target.value });
    }

    createTransferOrder = () => {
        const req = {
            method: 'POST',
            headers: { 'Session-Token': auth.getCookie('api.ptrade.com') },
            url: process.env.API_URL + '/users/' + this.props.user.id + '/transfers',
            data: qs.stringify({ balance: this.state.balance }),
        }
        axios(req)
            .then((response) => {
                console.log(response);
                this.getBankingTransactions();
            })
            .catch((error) => { console.log(error); });
    }

    getAccountBalance = () => {
        const req = {
            method: 'GET',
            headers: { 'Session-Token': auth.getCookie('api.ptrade.com') },
            url: process.env.API_URL + '/users/' + this.props.user.id + '/balance',
        }
        axios(req)
            .then((response) => {
                let balance = response.data['balance']
                this.setState({ accountBalance: balance });
            })
            .catch((error) => { console.log(error); });
    }

    getAccountPositions = () => {
        const req = {
            method: 'GET',
            headers: { 'Session-Token': auth.getCookie('api.ptrade.com') },
            url: process.env.API_URL + '/users/' + this.props.user.id + '/positions',
        }
        axios(req)
            .then((response) => {
                let positions = response.data['positions']
                this.setState({ positions: positions });
            })
            .catch((error) => { console.log(error); });
    }

    getPortfolioHistory = () => {
        const req = {
            method: 'GET',
            headers: { 'Session-Token': auth.getCookie('api.ptrade.com') },
            url: process.env.API_URL + '/users/' + this.props.user.id + '/charts',
        }
        axios(req)
            .then((response) => {
                let portfolioHistory = response.data['history']
                this.setState({ portfolioHistory: formatHistory(portfolioHistory) });
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
                changeTimeFrame={this.changeTimeFrame}
                submitTransaction={this.createTransferOrder}
            />
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Index);