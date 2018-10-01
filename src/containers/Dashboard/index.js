import React from 'react';
import { connect } from 'react-redux';
import { timeFormat, timeParse } from 'd3';
import axios from 'axios';
import qs from 'qs';

import { signout, validate } from 'redux/actions';
import * as auth from 'system/auth';

import Dashboard from './Dashboard';

// Parse data, return an array of objects containing a date and value,
// with the format date: %H:%M and price: ####.##.
// Ex. [{date: '12:30', 3.50}, {date: '12:35', 3.52}, {date: '12:40', 3.55}]
function parseOneDayData(data) {
    const formatTime = timeFormat("%I:%M");
    const parseTime = timeParse("%H:%M");
    let parsedData = data
        .map((d) => (
            {
                date: formatTime(parseTime(d.minute)),
                value: parseFloat(d.average.toPrecision(6)),
            }
        ))
        .filter(d => d.value > 0.0); // remove null values
    return parsedData;
}

// Parse data, return an array of objects containing a date and value,
function parseFiveYearData(data) {
    const formatTime = timeFormat("%Y-%m-%d");
    const parseTime = timeParse("%Y-%m-%d");
    const today = new Date();
    const fiveYearsAgo = new Date(today.getFullYear() - 5, today.getMonth(), today.getDate());
    var diff = Math.round((parseTime(data[0].date) - fiveYearsAgo) / (1000 * 60 * 60 * 24));

    // add empty data points for missing data
    var filler = [];
    var current = fiveYearsAgo;
    for (var i = 0; i < diff; i++) {
        filler.push({ date: formatTime(current), close: data[0].open });
        current.setDate(current.getDate() + 1);
    }
    console.log(data);
    data = filler.concat(data);

    let parsedData = data
        .map((d) => (
            {
                date: parseTime(d.date),
                value: parseFloat(d.close.toPrecision(6)),
            }
        ))
        .filter(d => d.value > 0.0); // remove null values
    return parsedData;
}

// return an array of data with data formatted to (month day year),
// includes only data with date field greater than the given cutoff date,
// interval will determine the interval between dates selected from the 
// original set.
function formatDate(data, date, interval) {
    const formatTime = timeFormat("%b %d %Y");
    let newData = data
        .filter((d, i) => (i % interval === 0 && d.date > date))
        .map(d => ({ date: formatTime(d.date), value: d.value, }));
    return newData;
}

// Parse quote, return an object of import stats.
function parseQuote(data) {
    let parsedQuote = {
        symbol: data['symbol'],
        name: data['companyName'],
        open: data['open'].toFixed(2),
        close: data['close'].toFixed(2),
        high: data['high'].toFixed(2),
        low: data['low'].toFixed(2),
        latestPrice: data['latestPrice'].toFixed(2),
        change: data['change'].toFixed(2),
        changePercent: data['changePercent'],
        avgTotalVolume: (data['avgTotalVolume'] / 1000000).toPrecision(4) + ' M',
        marketCap: Math.floor(data['marketCap'] / 1000000) + ' M',
        week52High: data['week52High'].toFixed(2),
        week52Low: data['week52Low'].toFixed(2),
    };
    return parsedQuote;
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
            oneDayData: [],
            fiveYearData: [],
            timeFrame: 0,
            data: [],
            quote: {},
            symbolSelected: 'AMZN', // default symbol
            symbolSearch: '',   // current search value
            quantity: 0,
        };
    }

    // Get initial data/quote
    componentWillMount() {
        this.props.validate();
        this.getOneDayData(this.state.symbolSelected);
        this.getFiveYearData(this.state.symbolSelected);
        this.getQuote(this.state.symbolSelected);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.timeFrame !== prevState.timeFrame) {
            this.updateChart();
        }
    }

    updateChart = () => {
        var today = new Date();
        var data;
        var date;
        switch (this.state.timeFrame) {
            case 0:
                this.setState({ data: this.state.oneDayData });
                data = this.state.oneDayData;
                break;
            case 1:
                date = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
                data = formatDate(this.state.fiveYearData, date, 1);
                break;
            case 2:
                date = new Date(today.getFullYear(), today.getMonth() - 6, today.getDate());
                data = formatDate(this.state.fiveYearData, date, 3);
                break;
            case 3:
                date = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
                data = formatDate(this.state.fiveYearData, date, 7);
                break;
            case 4:
                date = new Date(today.getFullYear() - 5, today.getMonth(), today.getDate());
                data = formatDate(this.state.fiveYearData, date, 35);
                break;
            default:
                break;
        }
        this.setState({ data: data });
    }

    changeTimeFrame = (event, tf) => {
        this.setState({ timeFrame: tf });
    }

    changeBuyQty = event => {
        // TOOD: trade request validation
        this.setState({ quantity: event.target.value });
    }

    changeSellQty = event => {
        // TOOD: trade request validation
        this.setState({ quantity: -event.target.value });
    }

    // Update symbol value based on search input. 
    changeSearch = event => {
        event.preventDefault();
        this.setState({ symbolSearch: event.target.value });
    }

    // Submit search, send requests for data/quote for current state.symbol
    submitSearch = () => {
        // TOOD: handle invalid symbols
        if (this.state['symbolSearch'].length < 1) {
            // no input
            return;
        }
        if (this.state.symbolSearch === this.state.symbolSelected) {
            // same symbol
            return;
        }
        this.setState({
            symbolSelected: this.state.symbolSearch,
            symbolSearch: '',
            timeFrame: 0,
        });
        this.getOneDayData(this.state.symbolSearch);
        this.getFiveYearData(this.state.symbolSearch);
        this.getQuote(this.state.symbolSearch);
    }

    // Submit trade request
    submitTrade = () => {
        const createTxnRequest = {
            method: 'POST',
            headers: { 'Session-Token': auth.getCookie('api.ptrade.com') },
            url: process.env.API_URL + '/users/' + this.props.user.id + '/transactions',
            data: qs.stringify({
                user_id: this.props.user.id,
                symbol: this.state.symbolSelected,
                quantity: this.state.quantity,
            }),
        }
        axios(createTxnRequest)
            .then((response) => { console.log(response) })
            .catch((error) => { console.log(error); });
    }

    // Send a GET request for the quote for the current state.symbol.
    getQuote = (symbol) => {
        const createSessionRequest = {
            method: 'GET',
            url: process.env.IEX_URL + '/' + symbol + '/quote',
        }
        axios(createSessionRequest)
            .then((response) => {
                this.setState({ quote: parseQuote(response.data) });
            })
            .catch((error) => { console.log(error); });
    }

    // Send a GET request for 1d data for the current state.symbol.
    getOneDayData = (symbol) => {
        const getDataRequest = {
            method: 'GET',
            url: process.env.IEX_URL + '/' + symbol + '/chart/1d?chartInterval=5',
        }
        axios(getDataRequest)
            .then((response) => {
                let oneDayData = parseOneDayData(response.data);
                this.setState({ oneDayData: oneDayData, data: oneDayData });
            })
            .catch((error) => { console.log(error); });
    }

    // Send a GET request for 5y data for the current state.symbol.
    getFiveYearData = (symbol) => {
        const getDataRequest = {
            method: 'GET',
            url: process.env.IEX_URL + '/' + symbol + '/chart/5y',
        }
        axios(getDataRequest)
            .then((response) => {
                this.setState({ fiveYearData: parseFiveYearData(response.data) });
            })
            .catch((error) => { console.log(error); });
    }

    render() {
        return (
            <Dashboard {...this.props} {...this.state}
                changeBuyQty={this.changeBuyQty}
                changeSearch={this.changeSearch}
                changeSellQty={this.changeSellQty}
                changeTimeFrame={this.changeTimeFrame}
                submitSearch={this.submitSearch}
                submitTrade={this.submitTrade}

            />
        );
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Index);