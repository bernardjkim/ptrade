import React, { Component } from 'react';
import Axios from 'axios';
import qs from 'qs';
import Cookies from 'universal-cookie';
import Router from './system/Router';

const cookies = new Cookies();

function isAuthenticated(cb) {

    Axios({
        method: "GET",
        url: "http://localhost:8080/auth/check",
        headers: { "X-App-Token": cookies.get("api.example.com") },
    })
        .then((response) => {
            setTimeout(cb(true), 100);
        })
        .catch((error) => {
            console.log(error);
            setTimeout(cb(false), 100);
        });
}




class Test extends Component {
    constructor(props) {
        super(props);
        this.state = { isAuthenticated: undefined, };
    }

    componentWillMount() {
        console.log("check auth");
        isAuthenticated((auth) => {
            this.setState({ isAuthenticated: auth, });
        })
    }
    
    render() {
        return (
            <div>
                <Router isAuthenticated={this.state.isAuthenticated}/>
            </div>
        );
    }
}

export default Test;