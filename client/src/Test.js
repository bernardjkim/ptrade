import React, { Component } from 'react';
import Axios from 'axios';
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
            setTimeout(cb(response), 100);
        })
        .catch((error) => {
            console.log(error);
            setTimeout(cb(undefined), 100);
        });
}




class Test extends Component {
    constructor(props) {
        super(props);

        this.authenticate = this.authenticate.bind(this);

        this.state = { 
            isAuthenticated: undefined,
            firstName: '',
            email: '',
         };
    }

    componentWillMount() {
        this.authenticate();
    }

    authenticate() {
        isAuthenticated((response) => {
            if (response === undefined) {
                this.setState({ isAuthenticated: false, });
            } else {
                this.setState({
                    firstName: response.data.user.First,
                    email: response.data.user.Email,
                    isAuthenticated: true,
                });
            }
        });
    }

    render() {
        if (this.state.isAuthenticated === undefined) {
            return (
                <div></div>
            )

        }
        return (
            <div>
                <Router
                    isAuthenticated={this.state.isAuthenticated}
                    authenticate={this.authenticate}
                    firstName={this.state.firstName}
                    email={this.state.email}
                />
            </div>
        );
    }
}

export default Test;