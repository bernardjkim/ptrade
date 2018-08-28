import React, {Component} from 'react';
import {connect} from 'react-redux';
import PriceChart from 'components/PriceChart';
import {Link} from 'react-router-dom';
import {
    Button
} from 'reactstrap';

const mapStateToProps = state => ({stock: state.stock});

class Dashboard extends Component {
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

const DashboardButtonLink = () => <Link to='/dashboard'><Button>Learn more</Button></Link>

export default connect(mapStateToProps)(Dashboard);

export {DashboardButtonLink}