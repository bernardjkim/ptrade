import React from 'react';
import Axios from 'axios';

// TODO: probably dont want to import all of d3 
import * as d3 from 'd3';

import Dashboard from './Dashboard';

export default class extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [],
            quote: {},
        };
    }

    componentWillMount() {
        this.getData();
        this.getQuote();
    }

    getQuote = () => {
        const IEX_URL = 'https://api.iextrading.com/1.0/stock';
        const symbol = 'AMZN';
        const createSessionRequest = {
            method: 'GET',
            url: IEX_URL + '/' + symbol + '/quote',
        }
        Axios(createSessionRequest)
            .then((response) => {
                this.parseQuote(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

    }

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

    getData = () => {
        const IEX_URL = 'https://api.iextrading.com/1.0/stock';
        const symbol = 'AMZN';
        const createSessionRequest = {
            method: 'GET',
            url: IEX_URL + '/' + symbol + '/chart/1d?chartInterval=5',
        }
        Axios(createSessionRequest)
            .then((response) => {
                this.parseData(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

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
            <Dashboard {...this.props} {...this.state} />
        );
    }
}