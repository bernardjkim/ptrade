import React, {Component} from 'react';
import {Redirect, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import * as account from '../redux-modules/actions/accountActions';
import FormComponent from './FormComponent';

const mapStateToProps = state => ({account: state.account});

class SignInForm extends Component {
    constructor() {
        super();
        this.handleSignIn = this
            .handleSignIn
            .bind(this);
        this.handleChange = this
            .handleChange
            .bind(this);
        this.state = {
            inputList: {
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

    handleSignIn(e) {
        const {email, password} = this.state.inputList;
        this
            .props
            .dispatch(account.signIn({email: email.value, password: password.value}));
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
                        handleSubmit={this.handleSignIn}
                        handleChange={this.handleChange}
                        submitLabel='Sign In'/>
                </div>

            );
        }
    }
}

const SignInLink = () => <div id="new-user" className="text-center">
    Already have an account?<Link to='/Login'> Sign in</Link>
</div>

export default connect(mapStateToProps)(SignInForm);

export {SignInLink}