import React, { Component } from 'react';
import Axios from 'axios';
import qs from 'qs';
import Cookies from 'universal-cookie';
import { Redirect, Link } from 'react-router-dom';

const cookies = new Cookies();

class SignInForm extends Component {
    constructor(props) {
        super(props);
        this.state = { isAuthenticated: false, };
    }

    componentWillMount() {
        if (cookies.get("api.example.com")) {
            this.onSignIn();
        }
    }

    onSignIn() {
        this.setState({ isAuthenticated: true, });
    }

    render() {
        if (this.state.isAuthenticated) {
            return (<Redirect to="/" />);
        } else {
            return (
                <FormComponent onSignIn={() => this.onSignIn()} />
            )
        }
    }
}

class FormComponent extends Component {
    handleSubmit(e) {
        let email = this.refs.email.value;
        let password = this.refs.password.value;
        let onSignIn = this.props.onSignIn;
        let signinRequest = {
            method: 'POST',
            url: 'http://localhost:8080/auth/login',
            data: qs.stringify({ email, password }),
        };

        Axios(signinRequest)
            .then(function (response) {
                cookies.set("api.example.com", response.data["token"], { maxAge: 300, });
                onSignIn();
            })
            .catch(function (error) {
                console.log(error);
            });

        e.preventDefault();
    }

    render() {
        return (
            <div>

                <button>
                    <Link to="/"> Go Home </Link>
                </button>

                <form onSubmit={(e) => this.handleSubmit(e)}>
                    <input type="text" ref="email" name="email" />
                    <input type="password" ref="password" name="password" />
                    <button type="submit">Sign In</button>
                </form>

                <button>
                    <Link to="/register"> Sign Up </Link>
                </button>

            </div>
        );
    }
}

export default SignInForm;