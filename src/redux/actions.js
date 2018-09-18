import axios from 'axios';
import qs from 'qs';

import * as auth from 'system/auth';

import {
    SESSION_CREATE_START,
    SESSION_CREATE_SUCCESS,
    SESSION_CREATE_FAIL,
    USER_CREATE_START,
    USER_CREATE_SUCCESS,
    USER_CREATE_FAIL,
    VALIDATE_START,
    VALIDATE_SUCCESS,
    VALIDATE_FAIL,
} from './types';

// Send a request to the ptrade api to create a new session with the
// given email and password.
export const signin = (email, password) => {
    const createSessionRequest = {
        method: 'POST',
        url: process.env.API_URL + '/sessions',
        data: qs.stringify({ email: email, password: password }),
    };
    return (dispatch) => {
        dispatch({ type: SESSION_CREATE_START })
        axios(createSessionRequest)
            .then(response => {
                dispatch({ type: SESSION_CREATE_SUCCESS, payload: response.data, });
                dispatch(validate());
            })
            .catch(error => {
                dispatch({ type: SESSION_CREATE_FAIL, payload: error, })
            });
    };
}

// Send a request to the ptrade api to create a new user with the
// given email and password.
export const signup = (first, last, email, password) => {
    const createUserRequest = {
        method: 'POST',
        url: process.env.API_URL + '/users',
        data: qs.stringify({
            first: first,
            last: last,
            email: email,
            password: password,
        }),
    }
    return (dispatch) => {
        dispatch({ type: USER_CREATE_START })
        axios(createUserRequest)
            .then(response => {
                dispatch({ type: USER_CREATE_SUCCESS, payload: response.data, });
                dispatch(signin(email, password));
            })
            .catch(error => {
                dispatch({ type: USER_CREATE_FAIL, payload: error, })
            });
    };
}

// Send a request to ptrade api to validate the current Session-Token.
export const validate = () => {
    const validateRequest = {
        method: 'GET',
        url: process.env.API_URL + '/sessions/validate',
        headers: { 'Session-Token': auth.getCookie('api.ptrade.com') },
    }
    return (dispatch) => {
        dispatch({ type: VALIDATE_START })
        axios(validateRequest)
            .then(response => {
                dispatch({ type: VALIDATE_SUCCESS, payload: response.data, });
            })
            .catch(error => {
                dispatch({ type: VALIDATE_FAIL, payload: error, })
            });
    };
}