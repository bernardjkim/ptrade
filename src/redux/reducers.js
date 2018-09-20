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

const initialState = {
    user: {
        isAuthenticated: undefined,
        id: undefined,
        first: '',
        last: '',
        email: '',
        fetching: false,
    },
}
export default function reducer(state = { ...initialState }, action) {
    switch (action.type) {

        // **CREATE SESSION**
        case SESSION_CREATE_START: {
            return { ...state, user: { ...state.user, fetching: true } };
        }
        case SESSION_CREATE_SUCCESS: {
            auth.setCookie('api.ptrade.com', action.payload['Session-Token'])
            return { ...state, user: { ...state.user, fetching: false } };
        }
        case SESSION_CREATE_FAIL: {
            return { ...state, user: { ...state.user, fetching: false } };
        }

        case SESSION_DELETE: {
            return { ...state, user: { ...state.user, isAuthenticated: false } };
        }

        // **CREATE USER**
        case USER_CREATE_START: {
            return { ...state, user: { ...state.user, fetching: true } };
        }
        case USER_CREATE_SUCCESS: {
            return { ...state, user: { ...state.user, fetching: false } };
        }
        case USER_CREATE_FAIL: {
            return { ...state, user: { ...state.user, fetching: false } };
        }

        // **VALIDATE TOKEN**
        case VALIDATE_START: {
            return { ...state, user: { ...state.user, fetching: true } };
        }
        case VALIDATE_SUCCESS: {
            const { id, first, last, email } = action.payload
            return {
                ...state,
                user: {
                    isAuthenticated: true,
                    id: id,
                    first: first,
                    last: last,
                    email: email,
                    fetching: false,
                },
            };
        }
        case VALIDATE_FAIL: {
            return { ...state, user: { ...state.user, fetching: false } };
            // return { ...state, fetching: false };
        }

        // **DEFAULT**
        default: {
            return { ...state };
        }

    }
}