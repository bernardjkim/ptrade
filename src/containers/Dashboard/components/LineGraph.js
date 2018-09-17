import React from 'react';
import * as d3 from 'd3';

class LineGraph extends React.Component {

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

    render() {
        let coordinates = this.getCoordinates(this.props.data, this.props.dims.width, this.props.dims.height)
        if (this.props.data.length < 1) {
            return null;
        }
        return (
            <svg width={this.props.dims.width} height={this.props.dims.height}>
                <Line coordinates={coordinates} />
                <Tooltip
                    data={this.props.data}
                    coordinates={coordinates}
                    dims={this.props.dims}
                />
            </svg>
        );
    }
}

function Line({ coordinates }) {
    let line = d3
        .line()
        .x((d) => d.x)
        .y((d) => d.y);

    const lineStyle = {
        fill: 'transparent',
        stroke: '#29b6f6',
        strokeWidth: 2
    }

    return (<path style={lineStyle} className='line' d={line(coordinates)} />)
}

class Tooltip extends Component {

    constructor(props) {
        super(props);

        this.handleMouseOver = this.handleMouseOver.bind(this);
        this.handleMouseOut = this.handleMouseOut.bind(this);

        this.state = {
            point: undefined,
            price: undefined,
        };
    }

    componentDidMount() {
        let price = this.props.data[this.props.data.length - 1].value;
        this.setState({ price: price })
    }

    handleMouseOver(index) {
        let point = this.props.coordinates[index];
        let price = this.props.data[index].value;
        this.setState({ point: point, price: price })
    }

    handleMouseOut() {
        let price = this.props.data[this.props.data.length - 1].value;
        this.setState({ point: null, price: price })
    }

    renderMarker() {
        if (!this.state.point) {
            return null;
        }
        return (
            <React.Fragment>
                <line
                    stroke={'steelblue'}
                    strokeDasharray={'3,3'}
                    width={2}
                    height={this.props.dims.height}
                    x1={this.state.point.x} y1={0}
                    x2={this.state.point.x} y2={this.props.dims.height}
                />
                <circle
                    fill={'steelblue'}
                    r={7.5}
                    cx={this.state.point.x}
                    cy={this.state.point.y}
                />
            </React.Fragment>
        )
    }

    render() {
        return (
            <React.Fragment>
                <Overlay
                    dims={this.props.dims}
                    coordinates={this.props.coordinates}
                    handleMouseOut={this.handleMouseOut}
                    handleMouseOver={this.handleMouseOver}
                />
                {/* TODO: price is not rerendered when new symbol is chosen */}
                <text x="20" y="20" fill="red">${this.state.price}</text>
                {/* TODO: correctly handle conditional rendering */}
                {this.renderMarker()}
            </React.Fragment>
        )
    }
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
                onMouseOut={() => props.handleMouseOut(key)}
                onMouseOver={() => props.handleMouseOver(key)}
            />
        );
    });
    return overlay;
}

export default LineGraph;