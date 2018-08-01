import React, {Component} from 'react';
import {Redirect, Link} from 'react-router-dom';
import {connect} from 'react-redux';

import * as account from '../redux-modules/actions/accountActions';

import FormComponent from './FormComponent';

const mapStateToProps = state => ({account: state.account});

class Register extends Component {
    constructor(props) {
        super(props);

        this.handleChange = this
            .handleChange
            .bind(this);
        this.handleSignUp = this
            .handleSignUp
            .bind(this);

        this.state = {
            inputList: {
                first: {
                    label: 'First Name',
                    type: 'text',
                    value: ''
                },
                last: {
                    label: 'Last Name',
                    type: 'text',
                    value: ''
                },
                email: {
                    label: 'Email',
                    type: 'text',
                    value: ''
                },
                password: {
                    label: 'Password',
                    type: 'password',
                    value: ''
                }
            }
        };
    }

    handleChange(e) {
        let inputList = {
            ...this.state.inputList
        };
        inputList[e.target.id]['value'] = e.target.value;

        this.setState({inputList: inputList})
    }

    handleSignUp(e) {
        const {first, last, email, password} = this.state.inputList;
        this
            .props
            .dispatch(account.create({first: first.value, last: last.value, email: email.value, password: password.value}));
        e.preventDefault();
    }

    render() {
        if (this.props.account.isAuthenticated) {
            return (<Redirect to="/"/>);
        } else {
            return (
                <div className="centered-horizontally-verically w-100 mw-330px">
                    <FormComponent
                        inputList={this.state.inputList}
                        handleSubmit={this.handleSignUp}
                        handleChange={this.handleChange}
                        submitLabel='Sign Up'/>
                </div>
            )
        }
    }
}

const RegisterLink = () => <div id="new-user" className="text-center">
    New user?<Link to='/register'> Create a new account.</Link>
</div>

export default connect(mapStateToProps)(Register);

export {RegisterLink};