import React, { Component } from 'react';
import Axios from 'axios';
import qs from 'qs';
import Cookies from 'universal-cookie';
import { Redirect, Link } from 'react-router-dom';
import { Form, FormGroup, } from 'react-bootstrap';
import { Grid, Row, Col, Button } from 'react-bootstrap';

import InputComponent from './InputComponent';

const cookies = new Cookies();

class SignInForm extends Component {

    render() {
        if (this.props.isAuthenticated) {
            return (<Redirect to="/" />);
        } else {
            return (
                <div>
                    <Grid>
                        <Row>
                            <Col mdOffset={4} md={4}>
                                <FormComponent handleSignIn={this.props.authenticate} />
                            </Col>
                        </Row>
                    </Grid>
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
        let handleSignIn = this.props.handleSignIn;

        let signinRequest = {
            method: 'POST',
            url: 'http://localhost:8080/auth/login',
            data: qs.stringify({ email, password }),
        };

        Axios(signinRequest)
            .then(function (response) {
                cookies.set("api.example.com", response.data["token"], { maxAge: 300, });
                handleSignIn();
            })
            .catch(function (error) {
                console.log(error);
            });

        e.preventDefault();
    }


    handleChange(e) {
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
                    <FormGroup>
                        <Button>
                            <Link to="/register"> Sign Up </Link>
                        </Button>
                    </FormGroup>
                </Form>

                <br />

            </div>
        );
    }
}

export default SignInForm;