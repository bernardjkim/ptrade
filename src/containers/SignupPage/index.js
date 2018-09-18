import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import LinearProgress from '@material-ui/core/LinearProgress';

import { signup, validate } from 'redux/actions';

import SignupPage from './SignupPage';

const mapDispatchToProps = dispatch => {
    return {
        signup: (first, last, email, password) => dispatch(signup(first, last, email, password)),
        validate: () => dispatch(validate()),
    };
};
const mapStateToProps = state => ({
    user: state.user,
});
class Index extends React.Component {
    constructor() {
        super();
        this.state = {
            form: {
                first: '',
                last: '',
                email: '',
                password: '',
                passwordConfirm: '',
            },
            showMissing: false,
        };
    }

    componentWillMount() {
        this.props.validate();
    }

    // Update form field values.
    change = name => event => {
        let form = { ...this.state.form };
        form[name] = event.target.value;
        this.setState({
            form: form,
        });
    }

    // Submit will send a create user request with the current form values.
    submit = event => {
        event.preventDefault()
        let form = this.state.form;

        let fieldsVerified = true;

        // check if any fields are empty
        Object.keys(form).forEach(key => {
            if (form[key].length < 1) {
                this.setState({ showMissing: true });
                fieldsVerified = false;
                console.log(key + ' is empty');
            }
        })

        // TODO: check email is not already in use
        // TODO: check for any spaces
        // TODO: check if password is 8 or more characters
        // TODO: check password and passwordConfirm match

        if (fieldsVerified) {
            const { first, last, email, password } = form;
            this.props.signup(first, last, email, password);
        }
    }

    // Capitalize the given string.
    capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    render() {
        const { user } = this.props;

        if (user.fetching) {
            return <LinearProgress />
        }

        // Redirect home if already authenticated
        if (user.isAuthenticated) {
            return <Redirect to="/dashboard" />
        }
        return (
            <SignupPage {...this.props} {...this.state}
                handleSubmit={this.submit}
                handleChange={this.change}
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);
