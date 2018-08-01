import React, {Component} from 'react';
import * as d3 from 'd3';
import {connect} from 'react-redux';

const mapStateToProps = state => ({stock: state.stock});

class Home extends Component {
    render() {
        return (
            <div className="container">
                <h1>Some sort of h1 main title</h1>
                <Graph data={this.props.stock.data}/>
                <Info/>
            </div>

        )
    }
}

class Line extends Component {
    constructor(props) {
        super(props);

        this.updateDimensions = this
            .updateDimensions
            .bind(this);

        this.state = {
            width: 0,
            height: 0
        };

    }

    /**
     * Set dimensions & add event listener
     */
    componentDidMount() {
        this.updateDimensions();
        window.addEventListener('resize', this.updateDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateDimensions);
    }

    /**
     * Calcuate & Update state of new dimensions
     */
    updateDimensions() {
        const newWidth = this.refs.graphContainer.clientWidth;
        const newHeight = Math.floor((newWidth * 2) / 3);
        this.setState({width: newWidth, height: newHeight});
        // console.log(this.state.width) console.log(this.state.height)
    }

    drawLine() {
        let xScale = d3
            .scaleTime()
            .domain(d3.extent(this.props.data, ({date}) => date))
            .rangeRound([0, this.state.width]);

        let yScale = d3
            .scaleLinear()
            .domain(d3.extent(this.props.data, ({value}) => value))
            .rangeRound([this.state.height, 0]);

        let line = d3
            .line()
            .x((d) => xScale(d.date))
            .y((d) => yScale(d.value));

        const lineStyle = {
            fill: 'transparent',
            stroke: '#29b6f6',
            strokeWidth: 2
        }
        return (<path style={lineStyle} className='line' d={line(this.props.data)}/>)
    }

    render() {
        return (
            <div
                ref='graphContainer'
                style={{
                backgroundColor: 'red'
            }}>
                <svg
                    className="line-container"
                    width={this.state.width}
                    height={this.state.height}>
                    {this.drawLine()}
                </svg>
            </div>
        )
    }
}

class Graph extends Component {

    render() {

        var rowConverter = function (d) {
            return {
                date: new Date(d.date),
                value: Math.floor(d.close)
            }
        }

        var data = [...this.props.data];
        data = data.map((d) => {
            return rowConverter(d);
        })
        if (this.props.data === undefined) {
            return (
                <div>Graph</div>
            );
        }

        return (
            <div>
                <h2>h2 - Graph</h2>
                <Line data={data}/>
            </div>

        )
    }

}

function Info(props) {
    return (
        <div>
            <h2>h2 - Info</h2>
        </div>

    )
}

export default connect(mapStateToProps)(Home);