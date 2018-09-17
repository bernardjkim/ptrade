import React from 'react';
import Axios from 'axios';

// TODO: probably dont want to import all of d3 
import * as d3 from 'd3';

import Dashboard from './Dashboard';

export default class extends React.Component {
    constructor() {
        super();
        this.state = {
            data: []
        };
    }

    componentWillMount() {
        this.getData();
    }

    getData = () => {
        const IEX_URL = 'https://api.iextrading.com/1.0/stock';
        const symbol = 'AAPL';
        const createSessionRequest = {
            method: 'GET',
            url: IEX_URL + '/' + symbol + '/chart/1d?chartInterval=5',
        }
        Axios(createSessionRequest)
            .then((response) => {
                // console.log(response);
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
                    value: d.average,
                }
            });
        this.setState({ data: parsedData });
    }

    render() {
        return (
            <Dashboard {...this.props} {...this.state} />
        );
    }
}