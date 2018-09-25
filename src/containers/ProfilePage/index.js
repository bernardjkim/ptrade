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
            data: [],
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
            url: process.env.API_URL + '/users/1/transactions',
        }
        axios(getTransactionsRequest)
            .then((response) => {
                this.setState({ data: response.data });
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