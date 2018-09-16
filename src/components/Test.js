import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as auth from 'system/auth';
import axios from 'axios';


const mapStateToProps = state => ({
    referenceDataSymbols: state.referenceData.dataSymbols
});

class Test extends Component {
    constructor(props) {
        super(props);

        this.state = {
            portfolio: [],
        }; 

    }

    componentDidMount() {
        const apiURL = 'https://bjstock.herokuapp.com';
        const request = {
            method: 'GET',
            url: apiURL + '/portfolio/stocks',
            headers: { 'X-App-Token': auth.getCookie('api.example.com') },
        }

        axios(request)
            .then((response) => {
                // console.log(response.data);
                this.setState({
                    portfolio: response.data,
                });
            })
            .catch((error) => {
                console.log(error);
            })
    }


    render() {

        // TODO: need to calculate sum, currently listing all transactions
        const PortfolioList = this.state.portfolio.map(({stock_id, quantity}, key) => {

            // TODO: map stocks by id for faster lookup
            var stock = this.props.referenceDataSymbols.find(({id}) => {
                return id === stock_id;
            });

            var stockItem = stock ? stock.symbol + '-' + quantity : undefined;
            return (
                <h1 key={key}>{stockItem}</h1>
            );
        })

        return (
            <div>
                <h1>Test</h1>
                {PortfolioList}
            </div>
        )
    }
}

export default connect(mapStateToProps)(Test);