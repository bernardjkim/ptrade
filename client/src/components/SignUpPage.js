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
        this.validateFirstName = this.validateFirstName.bind(this);
        this.validateLastName = this.validateLastName.bind(this);
        this.validateEmail = this.validateEmail.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            values: {
                first: '',
                last: '',
                email: '',
                password: ''
            },
            isValidFirst: true,
            isValidLast: true,
            isValidEmail: true,
        };
    }

    validateFirstName(e) {
        const { first } = this.state.values;
        if (first === "") {
            this.setState({ isValidFirst: false })
        } else {
            this.setState({ isValidFirst: true })
        }
    }

    validateLastName(e) {
        const { last } = this.state.values;
        if (last === "") {
            this.setState({ isValidLast: false })
        } else {
            this.setState({ isValidLast: true })
        }
    }

    validateEmail(e) {
        const { email } = this.state.values;
        if (email === "") {
            this.setState({ isValidEmail: false })
        } else {
            this.setState({ isValidEmail: true })
        }
    }

    handleChange(e) {
        const values = this.state.values;
        values[e.target.id] = e.target.value;
        this.setState({ values: values })
    }

    handleSubmit(e) {
        e.preventDefault();
        const { first, last, email, password } = this.state.values;
        this
            .props
            .dispatch(account.signUp({ first: capitalize(first.trim()), last: capitalize(last.trim()), email: email.trim(), password }));        
    }
    render() {
        const { isValidFirst, isValidLast, isValidEmail } = this.state;
        // Waiting for user to be authenticated
        if (this.props.fetchingAccount) {
            return <div></div>
        }

        // Return to home if already authenticated
        if (this.props.isAuthenticated) {
            return <Redirect to="/" />
        }

        return (
            <div className="centered-horizontally-verically w-100 mw-330px">
                <Form onSubmit={this.handleSubmit}>
                    <h1>Sign Up</h1>
                    <FormGroup>
                        <Input
                            id="first"
                            type="text"
                            placeholder="First Name"
                            onChange={this.handleChange}
                            onBlur={this.validateFirstName}
                            invalid={!isValidFirst} />
                            <FormFeedback invalid={"true"}>First name is required</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Input
                            id="last"
                            type="text"
                            placeholder="Last Name"
                            onChange={this.handleChange} 
                            onBlur={this.validateLastName}
                            invalid={!isValidLast}/>
                            <FormFeedback invalid={"true"}>Last name is required</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Input
                            id="email"
                            type="text"
                            placeholder="Email"
                            onChange={this.handleChange}
                            onBlur={this.validateEmail}
                            invalid={!isValidEmail} />
                            <FormFeedback invalid={"true"}>Email is required</FormFeedback>
                    </FormGroup>
                    <FormGroup>
                        <Input
                            id="password"
                            type="password"
                            placeholder="Password"
                            onChange={this.handleChange} />
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