import React, { Component } from 'react';
import { Redirect, } from 'react-router-dom';
import { Grid, Row, Col, } from 'react-bootstrap';
import { connect } from 'react-redux';

import * as account from '../redux-modules/actions/accountActions';

import FormComponent from './FormComponent';

const mapStateToProps = state => ({
    account: state.account,
});

class Register extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSignUp = this.handleSignUp.bind(this);

        this.state = {
            inputList: {
                first: {
                    label: 'First Name',
                    type: 'text',
                    value: '',
                },
                last: {
                    label: 'Last Name',
                    type: 'text',
                    value: '',
                },
                email: {
                    label: 'Email',
                    type: 'text',
                    value: '',
                },
                password: {
                    label: 'Password',
                    type: 'password',
                    value: '',
                },
            },
        };
    }

    handleChange(e) {
        let inputList = { ...this.state.inputList };
        inputList[e.target.id]['value'] = e.target.value;

        this.setState({ inputList: inputList })
    }

    handleSignUp(e) {
        const { first, last, email, password } = this.state.inputList;
        this.props.dispatch(account.create({
            first: first.value,
            last: last.value,
            email: email.value,
            password: password.value,
        }));
        e.preventDefault();
    }

    render() {
        if (this.props.account.isAuthenticated) {
            return (<Redirect to="/" />);
        } else {
            return (
                <Grid>
                    <Row>
                        <Col mdOffset={4} md={4}>
                            <FormComponent
                                inputList={this.state.inputList}
                                handleSubmit={this.handleSignUp}
                                handleChange={this.handleChange}
                                submitLabel='Sign Up'
                            />
                        </Col>
                    </Row>
                </Grid>
            )
        }
    }
}

export default connect(mapStateToProps)(Register);