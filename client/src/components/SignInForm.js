import React, { Component } from 'react';
import Axios from 'axios';
import qs from 'qs';
import Cookies from 'universal-cookie';
import { Redirect } from 'react-router-dom';

const cookies = new Cookies();

class SignInForm extends Component {
    constructor(props) {
        super(props);
        this.state = { returnHome: false, };
    }

    componentWillMount() {
        if (cookies.get("api.example.com")) {
            this.setState({ returnHome: true, });
        }
    }

    returnHome() {
        this.setState({ returnHome: true, });
    }
    render() {
        if (this.state.returnHome) {
            return ( <Redirect to="/" />);
        } else {
            return (
                <FormComponent returnHome={() => this.returnHome()} />
            )
        }
    }
}

class FormComponent extends Component {
    handleSubmit(e) {
        let email = this.refs.email.value;
        let password = this.refs.password.value;
        let returnHome = this.props.returnHome;
        let loginRequest = {
            method: 'POST',
            url: 'http://localhost:8080/auth/login',
            data: qs.stringify({ email, password }),
        };

        Axios(loginRequest)
            .then(function (response) {
                cookies.set("api.example.com", response.data["token"], { maxAge: 3600, });
                returnHome();
            })
            .catch(function (error) {
                console.log(error);
            });

        e.preventDefault();
    }

    render() {
        return (
            <div>
                <button onClick={() => this.props.returnHome()}> Go Home </button>
                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <input type="text" ref="email" name="email" />
                    <input type="password" ref="password" name="password" />
                    <button type="submit">Sign In</button>
                </form>
            </div>
        );
    }
}

export default SignInForm;