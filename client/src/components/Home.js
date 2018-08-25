import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DashboardButtonLink } from './Dashboard';
import {
    Button
} from 'reactstrap';

const mapStateToProps = state => ({ stock: state.stock });

class Home extends Component {
    render() {
        return (
            <div className="d-flex justify-content-center align-items-center text-center centered-horizontally-vertically h-100 w-100">
                <div>
                    <h1>Stock</h1>
                    <p>Buy, sell and manage your portfolio and know how others around you are doing.</p>
                    <DashboardButtonLink>Learn more</DashboardButtonLink>
                </div>  
            </div>
        )
    }
}



export default connect(mapStateToProps)(Home);