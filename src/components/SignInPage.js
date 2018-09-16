import React, {Component} from 'react';
import {Redirect, Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {
    Form,
    FormGroup,
    Input,
    Button
} from 'reactstrap';

import {SignUpLink} from 'components/SignUpPage';
import * as account from 'redux-modules/actions/accountActions';


const mapStateToProps = state => ({
    isAuthenticated: state.account.isAuthenticated,
    fetchingAccount: state.account.fetching,
});

class SignInPage extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            values: {
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
        const {email, password} = this.state.values;
        this
            .props
            .dispatch(account.signIn({email, password}));
        e.preventDefault();
    }

    render() {
        // Waiting for user to be authenticated
        if (this.props.fetchingAccount) {
            return <div></div>
        }

        // Redirect home if already authenticated
        if (this.props.isAuthenticated) {
            return <Redirect to="/"/>
        }

        return (
            <div className="centered-horizontally-verically w-100 mw-330px">
                <Form onSubmit={this.handleSubmit}>
                    <h1>Login</h1>
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
                    <Button className="w-100">Sign In</Button>
                </Form>
                <SignUpLink/>
            </div>
        );
    }
}

const SignInLink = () => <div id="new-user" className="text-center">
    Already have an account?<Link to='/Login'> Sign in</Link>
</div>

export default connect(mapStateToProps)(SignInPage);

export {SignInLink}