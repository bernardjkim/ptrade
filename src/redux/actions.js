import axios from 'axios';
import qs from 'qs';

import * as auth from 'system/auth';

import {
    SESSION_CREATE_START,
    SESSION_CREATE_SUCCESS,
    SESSION_CREATE_FAIL,
    SESSION_DELETE,
    USER_CREATE_START,
    USER_CREATE_SUCCESS,
    USER_CREATE_FAIL,
    VALIDATE_START,
    VALIDATE_SUCCESS,
    VALIDATE_FAIL,
} from './types';

// Send aan api request to create a new session with the given email and password.
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


// Sign out, send an api request to delete the current session for this token.
export const signout = () => {
    const createSessionRequest = {
        method: 'DELETE',
        url: process.env.API_URL + '/sessions',
        headers: { 'Session-Token': auth.getCookie('api.ptrade.com') },
    };
    auth.removeCookie('api.ptrade.com');
    return (dispatch) => {
        dispatch({ type: SESSION_DELETE })
    }
    // TODO: send delete request 
    // return (dispatch) => {
    //     dispatch({ type: SESSION_DELETE_START })
    //     axios(createSessionRequest)
    //         .then(response => {
    //             dispatch({ type: SESSION_DELETE_SUCCESS, payload: response.data, });
    //             dispatch(validate());
    //         })
    //         .catch(error => {
    //             dispatch({ type: SESSION_DELETE_FAIL, payload: error, })
    //         });
    // };
}

// Send an api request to create a new user with the given fields.
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

// Send an api request to validate the current Session-Token 
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