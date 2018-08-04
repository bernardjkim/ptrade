import React, {Component} from 'react';
import {Redirect, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {
    Form,
    FormGroup,
    Input,
    Button
} from 'reactstrap';

import {SignInLink} from 'components/SignInPage';
import * as account from 'redux-modules/actions/accountActions';


const mapStateToProps = state => ({
    isAuthenticated: state.account.isAuthenticated,
    fetchingAccount: state.account.fetching,
});

class SignUpPage extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            values: {
                first: '',
                last: '',
                email: '',
                password: ''
            }
        };
    }

    handleChange(e) {
        const values = this.state.values;
        values[e.target.id] = e.target.value;
        this.setState({values: values})
    }

    handleSubmit(e) {
        const {first, last, email, password} = this.state.values;
        this
            .props
            .dispatch(account.signUp({first, last, email, password}));
        e.preventDefault();
    }
    render() {
        // Waiting for user to be authenticated
        if (this.props.fetchingAccount) {
            return <div></div>
        }

        // Return to home if already authenticated
        if (this.props.isAuthenticated) {
            return <Redirect to="/"/>
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
                            onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Input 
                            id="last"
                            type="text"
                            placeholder="Last Name" 
                            onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Input 
                            id="email"
                            type="text"
                            placeholder="Email" 
                            onChange={this.handleChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Input 
                            id="password"
                            type="password"
                            placeholder="Password" 
                            onChange={this.handleChange}/>
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

export default connect(mapStateToProps)(SignUpPage);

export {SignUpLink};