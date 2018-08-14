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

        this.state = {
            dims: {},
        };
    }

    // Set dimensions & add event listener when component mounts
    componentDidMount() {
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

    parseData(data) {
        // convert time to date
        let parseTime = d3.timeParse('%H:%M')

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

    render() {
        // TODO: handle render when no data available
        if (this.props.dataOneDay.length < 1) {
            return (
                <div ref='chartContainer'>No Data: Try AAPL</div>
            );
        }

        let data = this.parseData(this.props.dataOneDay);

        return (
            <div ref='chartContainer'>
                <LineGraph
                    data={data}
                    dims={this.state.dims}
                />
                {/* <Info
                    symbol={this.props.symbol}
                    price={price}
                /> */}
            </div>
        )
    }
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