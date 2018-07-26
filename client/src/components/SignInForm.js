import React, { Component } from 'react';
import Axios from 'axios';
import qs from 'qs';
import Cookies from 'universal-cookie';
import { Redirect, Link } from 'react-router-dom';
import { ControlLabel, Form, FormGroup, FormControl, HelpBlock } from 'react-bootstrap';
import { Grid, Row, Col, Button } from 'react-bootstrap';

import InputComponent from './InputComponent';

const cookies = new Cookies();

class SignInForm extends Component {
    constructor(props) {
        super(props);

        this.onSignIn = this.onSignIn.bind(this);

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
                <div>
                    <Button>
                        <Link to="/"> Go Home </Link>
                    </Button>
                    <Grid>
                        <Row>
                            <Col mdOffset={4} md={4}>
                                <FormComponent onSignIn={this.onSignIn} />
                            </Col>
                        </Row>
                    </Grid>
                    <Button>
                        <Link to="/register"> Sign Up </Link>
                    </Button>
                </div>
            );
        }
    }
}

class FormComponent extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            email: '',
            password: '',
        };
    }

    handleSubmit(e) {
        let email = this.state.email;
        let password = this.state.password;
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


    handleChange(e) {
        console.log(e.target);
        const formId = e.target.id;
        const passwordId = "formPassword";
        const emailId = "formEmail";
        if (formId === emailId) {
            this.setState({ email: e.target.value, });
        } else if (formId === passwordId) {
            this.setState({ password: e.target.value, });
        } else {

        }
    }

    render() {
        return (
            <div>

                <br />

                <Form horizontal onSubmit={this.handleSubmit}>

                    <InputComponent
                        controlId="formEmail"
                        label="Email"
                        type="text"
                        value={this.state.email}
                        placeholder={"Enter Email"}
                        handleChange={this.handleChange}
                        help="Validation is based on string length."
                    />

                    <InputComponent
                        controlId="formPassword"
                        label="Password"
                        type="password"
                        value={this.state.password}
                        placeholder={"Enter Password"}
                        handleChange={this.handleChange}
                        help="Validation is based on string length."
                    />

                    <FormGroup>
                        <Button type="submit">Sign In</Button>
                    </FormGroup>
                </Form>

                <br />

            </div>
        );
    }
}

export default SignInForm;