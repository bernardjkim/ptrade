import React, { Component } from 'react';
import * as d3 from 'd3';
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    symbol: state.stock.symbol,
    data: state.stock.data,
});
class PriceChart extends Component {
    constructor(props) {
        super(props);

        this.updateDimensions = this.updateDimensions.bind(this);
        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseOut = this.handleMouseOut.bind(this);

        this.state = {
            dims: {},
            index: undefined, // currently selected tooltip index
        };
    }

    // componentWillMount() {
    // }

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
        // reduce dataset, get every 7th element
        let parsedData = data
            .map((d, i) => {
                return (i % 7 !== 0) ? null : {
                    date: new Date(d.date),
                    value: d.close
                }
            })
            .filter((d) => {
                return d != null;
            })
        return parsedData;
    }

    getCoordinates(data, width, height) {
        let xScale = d3
            .scaleTime()
            .domain(d3.extent(data, ({ date }) => date))
            .rangeRound([0, width]);

        let yScale = d3
            .scaleLinear()
            .domain(d3.extent(data, ({ value }) => value))
            .rangeRound([height, 0]);

        let coordinates = data.map((d) => {
            return { x: xScale(d.date), y: yScale(d.value) }
        })
        return coordinates;
    }

    handleMouseOver(index) {
        this.setState({ index: index });
    }

    handleMouseOut() {
        this.setState({ index: undefined });
    }

    render() {
        // TODO: handle render when no data available
        if (this.props.data.length < 1) {
            return (
                <div ref='chartContainer'>No Data: Try AAPL</div>
            );
        }

        let data = this.parseData(this.props.data);

        let price = this.state.index ? data[this.state.index].value : data[data.length-1].value;
        let coordinates = this.getCoordinates(data, this.state.dims.width, this.state.dims.height)

        return (
            <div ref='chartContainer'>
                <svg width={this.state.dims.width} height={this.state.dims.height}>
                    <Line coordinates={coordinates} />
                    <Overlay
                        coordinates={coordinates}
                        dims={this.state.dims}
                        handleMouseOver={this.handleMouseOver}
                        handleMouseOut={this.handleMouseOut}
                    />
                    <Tooltip
                        dims={this.state.dims}
                        point={
                            this.state.index
                                ? coordinates[this.state.index]
                                : undefined
                        }
                    />
                </svg>
                <Info
                    symbol={this.props.symbol}
                    price={price}
                />
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


function Line({ coordinates }) {
    // TODO: prevent rerender when updating tooltip only
    // console.log('render line')
    let line = d3
        .line()
        .x((d) => d.x)
        .y((d) => d.y);

    // TODO: where do put css styles
    const lineStyle = {
        fill: 'transparent',
        stroke: '#29b6f6',
        strokeWidth: 2
    }

    return (<path style={lineStyle} className='line' d={line(coordinates)} />)
}

function Overlay(props) {
    // TODO: prevent rerender when tooltip is updated
    // console.log('render overlay')
    let width = props.dims.width / props.coordinates.length;
    const overlay = props.coordinates.map((p, key) => {
        return (
            <rect
                key={key}
                opacity={0} // {fill:none} / {display:none} dont seem to trigger mouse events??
                width={width}
                height={props.dims.height}
                x={p.x}
                onMouseOver={() => props.handleMouseOver(key)}
                onMouseOut={() => props.handleMouseOut(key)}
            />
        );
    });
    return overlay;
}

function Tooltip({ point, dims }) {
    if (!point) {
        return null;
    }
    return (
        <React.Fragment>
            <line
                stroke={'steelblue'}
                strokeDasharray={'3,3'}
                width={2}
                height={dims.height}
                x1={point.x} y1={0}
                x2={point.x} y2={dims.height}
            />
            <circle
                fill={'steelblue'}
                r={7.5}
                cx={point.x}
                cy={point.y}
            />
        </React.Fragment>
    )
}

export default connect(mapStateToProps)(PriceChart);