import React, {Component} from 'react';
import {connect} from 'react-redux';

import PriceChart from 'components/PriceChart';

const mapStateToProps = state => ({stock: state.stock});

class Home extends Component {
    render() {
        return (
            <div className="container">
                <h1>Some sort of h1 main title</h1>
                <PriceChart/>
                {/* <Info/> */}
            </div>

        )
    }
}



export default connect(mapStateToProps)(Home);