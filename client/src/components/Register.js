import React, { Component } from 'react';
import Cookie from 'universal-cookie';
import qs from 'qs';
import Axios from 'axios';
import { Redirect, Link } from 'react-router-dom';
import { ControlLabel, Form, FormGroup, FormControl, HelpBlock } from 'react-bootstrap';
import { Grid, Row, Col, Button } from 'react-bootstrap';

import InputComponent from './InputComponent';

const cookies = new Cookie();

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = { isAuthenticated: false, };
    }

    componentWillMount() {
        if (cookies.get("api.example.com")) {
            this.onSignUp();
        }
    }

    onSignUp() {
        this.setState({ isAuthenticated: true, });
    }

    render() {
        if (this.state.isAuthenticated) {
            return (<Redirect to="/" />);
        } else {
            return (
                <Grid>
                    <Row>
                        <Col mdOffset={4} md={4}>
                            <FormComponent onSignUp={() => this.onSignUp} />
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
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
        };
    }
    handleSubmit(e) {
        let firstName = this.refs.firstName.value;
        let lastName = this.refs.lastName.value;
        let email = this.refs.email.value;
        let password = this.refs.password.value;
        let onSignUp = this.props.onSignUp;
        let signUpRequest = {
            method: 'POST',
            url: 'http://localhost:8080/auth/signup',
            data: qs.stringify({ email, password, firstName, lastName }),
        };

        Axios(signUpRequest)
            .then(function (response) {
                console.log("registration successful");
                onSignUp();
            })
            .catch(function (error) {
                console.log("registration successful");
                console.log(error);
            });

        e.preventDefault();
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
                this.setState({ passwordName: e.target.value, })
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
                    label="First Name"
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