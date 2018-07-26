import React, { Component } from 'react';
import Cookie from 'universal-cookie';
import qs from 'qs';
import Axios from 'axios';
import { Redirect, } from 'react-router-dom';
import { Form, FormGroup, } from 'react-bootstrap';
import { Grid, Row, Col, Button } from 'react-bootstrap';

import InputComponent from './InputComponent';

const cookies = new Cookie();

class Register extends Component {

    render() {
        if (this.props.isAuthenticated) {
            return (<Redirect to="/" />);
        } else {
            return (
                <Grid>
                    <Row>
                        <Col mdOffset={4} md={4}>
                            <FormComponent authenticate={this.props.authenticate} />
                        </Col>
                    </Row>
                </Grid>
            )
        }
    }
}

class FormComponent extends Component {
    constructor(props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSignIn = this.handleSignIn.bind(this);

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
        };
    }
    handleSubmit(e) {
        let firstName = this.state.firstName;
        let lastName = this.state.lastName;
        let email = this.state.email;
        let password = this.state.password;
        let handleSignIn = this.handleSignIn;
        let signUpRequest = {
            method: 'POST',
            url: 'http://localhost:8080/auth/signup',
            data: qs.stringify({ email, password, firstName, lastName }),
        };

        Axios(signUpRequest)
            .then(function (response) {
                console.log("registration successful");
                handleSignIn();
                // TODO: notify that registration was success and redirect
            })
            .catch(function (error) {
                console.log("failed to register");
                console.log(error);
            });

        e.preventDefault();
    }

    handleSignIn() {
        let email = this.state.email;
        let password = this.state.password;
        let authenticate = this.props.authenticate;

        let signinRequest = {
            method: 'POST',
            url: 'http://localhost:8080/auth/login',
            data: qs.stringify({ email, password }),
        };

        Axios(signinRequest)
            .then(function (response) {
                cookies.set("api.example.com", response.data["token"], { maxAge: 300, });
                authenticate();
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    handleChange(e) {
        const formId = e.target.id;
        const firstNameId = "formFirstName";
        const lastNameId = "formLastName";
        const passwordId = "formPassword";
        const emailId = "formEmail";
        switch (formId) {
            case firstNameId:
                this.setState({ firstName: e.target.value, })
                return;
            case lastNameId:
                this.setState({ lastName: e.target.value, })
                return;
            case emailId:
                this.setState({ email: e.target.value, })
                return;
            case passwordId:
                this.setState({ password: e.target.value, })
                return;
            default:
                return;
        }
    }

    render() {
        return (
            <Form horizontal onSubmit={this.handleSubmit}>

                <InputComponent
                    controlId="formFirstName"
                    label="First Name"
                    type="text"
                    value={this.state.firstName}
                    placeholder={"Enter First Name"}
                    handleChange={this.handleChange}
                />
                <InputComponent
                    controlId="formLastName"
                    label="Last Name"
                    type="text"
                    value={this.state.lastName}
                    placeholder={"Enter Last Name"}
                    handleChange={this.handleChange}
                />
                <InputComponent
                    controlId="formEmail"
                    label="Email"
                    type="text"
                    value={this.state.email}
                    placeholder={"Enter Email"}
                    handleChange={this.handleChange}
                />

                <InputComponent
                    controlId="formPassword"
                    label="Password"
                    type="password"
                    value={this.state.password}
                    placeholder={"Enter Password"}
                    handleChange={this.handleChange}
                />

                <FormGroup>
                    <Button type="submit">Sign Up</Button>
                </FormGroup>
            </Form>
        );
    }
}

export default Register;