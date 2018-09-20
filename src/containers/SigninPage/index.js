import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import LinearProgress from '@material-ui/core/LinearProgress';

import { signin, validate } from 'redux/actions';

import SigninPage from './SigninPage';

const mapDispatchToProps = dispatch => {
    return {
        signin: (email, password) => dispatch(signin(email, password)),
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
                email: '',
                password: '',
            },
            showMissing: false,
        };
    }

    componentWillMount() {
        this.props.validate();
    }

    // Change will update the form values.
    change = name => event => {
        let form = { ...this.state.form };
        form[name] = event.target.value;
        this.setState({
            form: form,
        });
    }

    // Submit will verify fields and attempt to signin with the current
    // form values.
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

        // TODO: check for any invalid characters

        if (fieldsVerified) {
            //TODO: how to dispatch async action
            this.props.signin(form['email'], form['password']);
        }
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
            <SigninPage {...this.props} {...this.state}
                handleSubmit={this.submit}
                handleChange={this.change}
            />
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index);