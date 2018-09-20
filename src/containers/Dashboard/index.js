import React from 'react';
import Axios from 'axios';
import { connect } from 'react-redux';

// TODO: probably dont want to import all of d3 
import * as d3 from 'd3';

import { signout, validate } from 'redux/actions';

import Dashboard from './Dashboard';

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
            data: [],
            quote: {},
            symbol: 'AMZN', // default symbol
        };
    }

    // Get initial data/quote
    componentWillMount() {
        this.props.validate();
        this.getData();
        this.getQuote();
    }

    // Signout, delete current session
    signout = () => {
        this.props.signout();
    }


    // Update symbol value based on search input. 
    changeSearch = event => {
        this.setState({ symbol: event.target.value });
    }

    // Submit search, send requests for data/quote for current state.symbol
    submitSearch = event => {
        event.preventDefault()
        if (this.state['symbol'].length < 1) {
            console.log('No search input.')
            return
        }
        this.getData();
        this.getQuote();
        this.setState({ symbol: '' }); // prevent client from sending request for same symbol repeatedly.
    }

    // Send a GET request for the quote for the current state.symbol.
    // If successful, parse quote.
    // Else, log error.
    // TODO: handle error.
    getQuote = () => {
        const createSessionRequest = {
            method: 'GET',
            url: process.env.IEX_URL + '/' + this.state.symbol + '/quote',
        }
        Axios(createSessionRequest)
            .then((response) => { this.parseQuote(response.data); })
            .catch((error) => { console.log(error); });
    }

    // Send a GET request for 1d data for the current state.symbol.
    // If successful, parse data.
    // Else, log error.
    // TODO: handle error.
    getData = () => {
        const createSessionRequest = {
            method: 'GET',
            url: process.env.IEX_URL + '/' + this.state.symbol + '/chart/1d?chartInterval=5',
        }
        Axios(createSessionRequest)
            .then((response) => { this.parseData(response.data); })
            .catch((error) => { console.log(error); });
    }

    // Parse quote, store import stats into state quote.
    parseQuote = (data) => {
        let parsedQuote = {
            symbol: data['symbol'],
            name: data['companyName'],
            open: data['open'],
            close: data['close'],
            high: data['high'],
            low: data['low'],
            latestPrice: data['latestPrice'],
            change: data['change'],
            changePercent: data['changePercent'],
            avgTotalVolume: data['avgTotalVolume'],
            marketCap: data['marketCap'],
            week52High: data['week52High'],
            week52Low: data['week52Low'],
        };
        this.setState({ quote: parsedQuote });
    }

    // Parse data, set data to an array of objects containing a date and value,
    // with the format date: %H:%M and price: 1234.56.
    // Ex. [{date: '12:30', 3.50}, {date: '12:35', 3.52}, {date: '12:40', 3.55}]
    parseData = (data) => {
        const formatTime = d3.timeFormat("%I:%M");
        const parseTime = d3.timeParse("%H:%M");
        let parsedData = data
            .map((d) => {
                return {
                    date: formatTime(parseTime(d.minute)),
                    value: parseFloat(d.average.toPrecision(6)),
                }
            })
            .filter(d => d.value > 0.0);
        this.setState({ data: parsedData });
    }

    render() {
        return (
            <Dashboard {...this.props} {...this.state}
                changeSearch={this.changeSearch}
                submitSearch={this.submitSearch}
                signout={this.signout}
            />
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Index);