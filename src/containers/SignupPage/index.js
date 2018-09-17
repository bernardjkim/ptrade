import React from 'react';
import qs from 'qs';
import Axios from 'axios';

import View from './SignupPage';

export default class extends React.Component {
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

    change = name => event => {
        let form = { ...this.state.form };
        form[name] = event.target.value;
        this.setState({
            form: form,
        });
    }

    // TODO: 
    // - check email is not already in use
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

        // TODO: check for any spaces

        // TODO: check if password is 8 or more characters

        // TODO: check password and passwordConfirm match

        if (fieldsVerified) {
            this.signup()
        }
    }

    signup = () => {
        const { first, last, email, password } = this.state.form;

        const createUserRequest = {
            method: 'POST',
            url: process.env.API_URL + '/users',
            data: qs.stringify({
                first: capitalize(first),
                last: capitalize(last),
                email: email,
                password: password,
            }),
        }
        Axios(createUserRequest)
            .then((response) => {
                //TODO: redirect and signin
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }


    render() {
        return (
            <View {...this.props} {...this.state}
                handleSubmit={this.submit}
                handleChange={this.change}
            />
        );
    }
}

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}