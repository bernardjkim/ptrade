import * as auth from 'system/auth';
import { account } from 'redux-modules/actions/types';

const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    fetching: false,
    isAuthenticated: undefined,
}
export default function reducer(state = { ...initialState }, action) {
    switch (action.type) {

        //// CHECK 

        case account.CHECK_PENDING: {
            return { ...state, fetching: true };
        }
        case account.CHECK_FULFILLED: {
            const { first, last, email } = action.payload.data.user;

            return {
                ...state,
                fetching: false,
                firstName: first,
                lastName: last,
                email: email,
                isAuthenticated: true,
            };
        }
        case account.CHECK_REJECTED: {
            return {
                ...state,
                fetching: false,
                isAuthenticated: false,
            };
        }

        //// SIGN IN

        case account.SIGNIN_PENDING: {
            return { ...state, fetching: true };
        }
        case account.SIGNIN_FULFILLED: {
            auth.setCookie('api.example.com', action.payload.data.token)
            return { ...state, fetching: false };
        }
        case account.SIGNIN_REJECTED: {
            return { ...state, fetching: false };
        }

        //// SIGN OUT

        case account.SIGNOUT: {
            auth.removeCookie('api.example.com');
            return { ...initialState, isAuthenticated: false };
        }

        //// DEFAULT

        default: {
            return { ...state };
        }

    }
}