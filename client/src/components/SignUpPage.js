import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
    Form,
    FormGroup,
    Input,
    Button,
    FormFeedback
} from 'reactstrap';
import { SignInLink } from 'components/SignInPage';
import * as account from 'redux-modules/actions/accountActions';


const mapStateToProps = state => ({
    isAuthenticated: state.account.isAuthenticated,
    fetchingAccount: state.account.fetching,
});

class SignUpPage extends Component {
    constructor(props) {
        super(props);
        this.validateFirst = this.validateFirst.bind(this);
        this.validateLast = this.validateLast.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
        this.validatePassword = this.validatePassword.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            values: {
                first: '',
                last: '',
                email: '',
                password: ''
            },
            isValidFirst: null,
            isValidLast: null,
            isValidEmail: null,
            isValidPassword: null,
        };
    }

    validateFirst(e) {
        const { first } = this.state.values;
        this.setState({
            isValidFirst: !this.isEmpty(first)
        })
    }

    validateLast(e) {
        const { last } = this.state.values;
        this.setState({
            isValidLast: !this.isEmpty(last),
        })
    }

    validateEmail(e) {
        const { email } = this.state.values;
        this.setState({
            isValidEmail: !this.isEmpty(email)
        })
    }

    validatePassword(e) {
        const { password } = this.state.values;
        this.setState({
            isValidPassword: !this.isEmpty(password)
        })
    }

    isEmpty(value) {
        return value === "";
    }

    handleChange(e) {
        const values = this.state.values;
        values[e.target.id] = e.target.value;
        this.setState({ values: values })
    }

    handleSubmit(e) {
        e.preventDefault();
        const { first, last, email, password } = this.state.values;
        const { isValidFirst, isValidLast, isValidEmail, isValidPassword } = this.state;
        if (isValidFirst && isValidLast && isValidEmail && isValidPassword) {
            this
                .props
                .dispatch(account.signUp({ first: capitalize(first.trim()), last: capitalize(last.trim()), email: email.trim(), password }));
        }
    }
    render() {
        const { isValidFirst, isValidLast, isValidEmail, isValidPassword } = this.state;
        // Waiting for user to be authenticated
        if (this.props.fetchingAccount) {
            return <div></div>
        }
        
        // Redirect back to previous page
         if (this.props.isAuthenticated) {
            this.props.history.goBack();
        }

        return (
            <div className="centered-horizontally-vertically w-100 mw-330px">
                <Form onSubmit={this.handleSubmit}>
                    <h1>Sign Up</h1>
                    <FormGroup>
                        <Input
                            id="first"
                            type="text"
                            placeholder="First Name"
                            onChange={this.handleChange}
                            onBlur={this.validateFirst}
                            invalid={isValidFirst === null ? null : !isValidFirst} />
                        <FormFeedback invalid={"true"}>First name is required</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Input
                            id="last"
                            type="text"
                            placeholder="Last Name"
                            onChange={this.handleChange}
                            onBlur={this.validateLast}
                            invalid={isValidLast === null ? null : !isValidLast} />
                        <FormFeedback invalid={"true"}>Last name is required</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Input
                            id="email"
                            type="text"
                            placeholder="Email"
                            onChange={this.handleChange}
                            onBlur={this.validateEmail}
                            invalid={isValidEmail === null ? null : !isValidEmail} />
                        <FormFeedback invalid={"true"}>Email is required</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Input
                            id="password"
                            type="password"
                            placeholder="Password"
                            onChange={this.handleChange}
                            onBlur={this.validatePassword}
                            invalid={isValidPassword === null ? null : !isValidPassword} />
                        <FormFeedback invalid={"true"}>Password is required</FormFeedback>
                    </FormGroup>
                    <Button className="w-100">Create Account</Button>
                </Form>
                <SignInLink />
            </div>
        );
    }
}

const SignUpLink = () => <div id="new-user" className="text-center">
    New user?<Link to='/register'> Create a new account.</Link>
</div>

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export default connect(mapStateToProps)(SignUpPage);

export { SignUpLink };