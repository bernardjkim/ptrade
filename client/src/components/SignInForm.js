import React, { Component } from 'react';
import { Redirect, Link} from 'react-router-dom';
import { Grid, Row, Col, Button, } from 'react-bootstrap';
import { connect } from 'react-redux';

import * as account from '../actions/accountActions';

import FormComponent from './FormComponent';

const mapStateToProps = state => ({
    account: state.account,
});

class SignInForm extends Component {
    constructor() {
        super();
        this.handleSignIn = this.handleSignIn.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            inputList: {
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

    handleSignIn(e) {
        const { email, password } = this.state.inputList;
        this.props.dispatch(account.signIn({
            email: email.value,
            password: password.value
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
                                handleSubmit={this.handleSignIn}
                                handleChange={this.handleChange}
                                submitLabel='Sign In'
                            />
                            <Link to='/register'>
                                <Button>Sign Up</Button>
                            </Link>
                        </Col>
                    </Row>
                </Grid>
            );
        }
    }
}

export default connect(mapStateToProps)(SignInForm);