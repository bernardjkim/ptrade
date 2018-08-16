import React, { Component } from 'react';
import * as d3 from 'd3';
import { connect } from 'react-redux';

import LineGraph from 'components/LineGraph'

const mapStateToProps = state => ({
    symbol: state.stock.symbol,
    dataOneDay: state.stock.dataOneDay,
    dataFiveYears: state.stock.dataFiveYears,
});

class PriceChart extends Component {
    constructor(props) {
        super(props);

        this.updateDimensions = this.updateDimensions.bind(this);
        this.updateTimeFrame = this.updateTimeFrame.bind(this);
        this.getData = this.getData.bind(this);

        this.state = {
            dims: {},
            timeFrame: '',
            // data: [],
        };

        console.log('constructor')
    }

    // Set dimensions & add event listener when component mounts
    componentDidMount() {
        this.updateTimeFrame('1d');
        this.updateDimensions();
        window.addEventListener('resize', this.updateDimensions);
    }

    // Remove event listener when component unmounts
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
    }

    // Calcuate & Update state of new dimensions
    // Ratio of width:height => 3:2
    updateDimensions() {
        let newWidth = this.refs.chartContainer.clientWidth;
        let newHeight = Math.floor((newWidth * 2) / 3);

        // prevent rerender if width/height stay the same
        if (this.state.dims.width !== newWidth || this.state.dims.height !== newHeight) {
            this.setState({
                dims: {
                    width: newWidth,
                    height: newHeight
                }
            });
        }
    }

    parseData1(data) {
        // convert time to date
        const parseTime = d3.timeParse('%H:%M')

        // TODO: handle outliers. for now just removing from set
        let parsedData = data
            .map((d) => {
                return (d.average < 0) ? null : {
                    date: parseTime(d.minute),
                    value: d.average
                }
            })
            .filter((d) => {
                return d != null;
            })
        return parsedData;
    }

    parseData2(data, cutOffDate) {
        const parseTime = d3.timeParse('%Y-%m-%d');

        // TODO: probably a better way to handle parsing / filtering
        let parsedData = data
            .map((d) => {
                return {
                    date: parseTime(d.date),
                    value: d.close
                }
            })
            .filter((d, i) => {
                return (d.date > cutOffDate);
            })

        const interval = Math.ceil(parsedData.length / 50);

        parsedData = parsedData.filter((d,i) => {
            return i % interval === 0;
        })
        return parsedData;
    }

    // TOOD: better way to handle switching time frames and loading data?
    getData() {
        let cutOffDate = new Date();
        switch (this.state.timeFrame) {
            case '5y':
                cutOffDate.setDate(cutOffDate.getDate() - (365 * 5));
                return this.parseData2(this.props.dataFiveYears, cutOffDate);
            case '1y':
                cutOffDate.setDate(cutOffDate.getDate() - 365);
                return this.parseData2(this.props.dataFiveYears, cutOffDate);
            case '3m':
                cutOffDate.setDate(cutOffDate.getDate() - (31 * 3));
                return this.parseData2(this.props.dataFiveYears, cutOffDate);
            case '1m':
                cutOffDate.setDate(cutOffDate.getDate() - 31);
                return this.parseData2(this.props.dataFiveYears, cutOffDate);
            case '1d':
                cutOffDate.setDate(cutOffDate.getDate() - 1);
                return this.parseData1(this.props.dataOneDay, cutOffDate);
            default:
                console.log('invalid time frame');
                break;
        }
    }

    updateTimeFrame(timeFrame) {
        if (this.state.timeFrame !== timeFrame) {
            this.setState({ timeFrame: timeFrame });
        }
    }

    render() {
        // console.log(this.state)
        // TODO: handle render when no data available
        if (this.props.dataOneDay.length < 1) {
            return (
                <div ref='chartContainer'>No Data: Try AAPL</div>
            );
        }

        let data = this.getData();

        return (
            <div ref='chartContainer'>
                <LineGraph
                    data={data}
                    dims={this.state.dims}
                />
                <TimeFrames
                    updateTimeFrame={this.updateTimeFrame}
                />
                {/* <Info
                    symbol={this.props.symbol}
                    price={price}
                /> */}
            </div>
        )
    }
}

function TimeFrames(props) {
    return (
        <div>
            <button onClick={() => props.updateTimeFrame('5y')}>5y</button>
            <button onClick={() => props.updateTimeFrame('1y')}>1y</button>
            <button onClick={() => props.updateTimeFrame('3m')}>3m</button>
            <button onClick={() => props.updateTimeFrame('1m')}>1m</button>
            <button onClick={() => props.updateTimeFrame('1d')}>1d</button>
        </div>
    );
}

function Info({ symbol, price }) {
    if (!symbol) {
        return null;
    }
    return (
        <h3>{symbol} ${price}</h3>
    )
}

export default connect(mapStateToProps)(PriceChart);