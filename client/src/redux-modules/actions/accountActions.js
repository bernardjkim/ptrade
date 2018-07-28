import axios from 'axios';
import qs from 'qs';

import * as auth from '../../system/auth';
import { account } from './types';


export function check() {
    const authRequest = {
        method: 'GET',
        url: 'http://localhost:8080/auth/check',
        headers: { 'X-App-Token': auth.getCookie('api.example.com') },
    }

    return function (dispatch) {
        dispatch({
            type: account.CHECK,
            payload: axios(authRequest),
        })
            .catch(error => {
                console.log(error);
            });
    }
}

export function create(user) {
    const { first, last, email, password } = user;
    const authRequest = {
        method: 'POST',
        url: 'http://localhost:8080/auth/signup',
        data: qs.stringify({
            firstName: first,
            lastName: last,
            email: email,
            password: password,
        }),
    }

    return function (dispatch) {
        dispatch({
            type: account.CREATE,
            payload: axios(authRequest),
        })
            .then((response) => {
                dispatch(signIn({ email, password }));

            })
            .catch(error => {
                console.log(error);
            });
    }
}

export function signIn(user) {
    const authRequest = {
        method: 'POST',
        url: 'http://localhost:8080/auth/login',
        data: qs.stringify({ email: user.email, password: user.password }),
    }

    return function (dispatch) {
        dispatch({
            type: account.SIGNIN,
            payload: axios(authRequest),
        })
        .then((response) => {
            dispatch(check());
        })
            .catch(error => {
                console.log(error);
            });
    }
}

export function signOut() {
    return {
        type: account.SIGNOUT,
    }
}
