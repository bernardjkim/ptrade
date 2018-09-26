import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { validate } from 'redux/actions';
import { Redirect } from 'react-router-dom';
import * as auth from 'system/auth';

import LinearProgress from '@material-ui/core/LinearProgress';

import ProfilePage from './ProfilePage';

const mapDispatchToProps = dispatch => {
    return {
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
            data: {},
            portfolioValue: 0,
        };
    }

    componentWillMount() {
        this.props.validate();
        this.getTransactions();
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
                this.processData(response.data);
                this.setState({ transactions: response.data });
            })
            .catch((error) => { console.log(error); });
    }

    processData = (data) => {
        let newData = {};
        data.forEach(({ stock, transaction }) => {
            let { symbol } = stock;
            let { stock_id, price, quantity } = transaction;
            if (!(stock_id in newData)) {
                newData[stock_id] = {
                    symbol: symbol,
                    quantity: quantity,
                    pps: price,
                }
            } else {
                let prevQty = newData[stock_id]['quantity'];
                newData[stock_id]['quantity'] = prevQty + quantity;
            }
        });

        // get total profile value
        let portfolioValue = 0;
        Object.keys(newData).forEach(key => {
            let pps = newData[key]['pps'];
            let qty = newData[key]['quantity'];
            portfolioValue = portfolioValue + (pps * qty);

        })
        this.setState({ data: newData, portfolioValue: portfolioValue });
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