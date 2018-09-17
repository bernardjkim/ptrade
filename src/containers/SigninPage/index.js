import React from 'react';
import qs from 'qs';
import Axios from 'axios';

import View from './SigninPage';

export default class extends React.Component {
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

    change = name => event => {
        let form = { ...this.state.form };
        form[name] = event.target.value;
        this.setState({
            form: form,
        });
    }

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
            this.signin()
        }
    }

    signin = () => {
        const { email, password } = this.state.form;

        const createSessionRequest = {
            method: 'POST',
            url: process.env.API_URL + '/sessions',
            data: qs.stringify({
                email: email,
                password: password,
            }),
        }
        Axios(createSessionRequest)
            .then((response) => {
                // TODO: store session token
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