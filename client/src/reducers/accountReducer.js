import * as auth from '../system/auth';

const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    fetching: false,
    isAuthenticated: undefined,
}
export default function reducer(state = {...initialState}, action) {
    switch (action.type) {

        case 'ACCOUNT_CHECK_PENDING': {
            return { ...state, fetching: true };
        }

        case 'ACCOUNT_CHECK_FULFILLED': {
            const {First, Last, Email} = action.payload.data.user;

            return {
                ...state,
                fetching: false,
                firstName: First,
                lastName: Last,
                email: Email,
                isAuthenticated: true,
            };
        }

        case 'ACCOUNT_CHECK_REJECTED': {
            return {
                ...state,
                fetching: false,
                isAuthenticated: false,
            };
        }

        case 'ACCOUNT_SIGNIN_PENDING': {
            return { ...state, fetching: true };
        }

        case 'ACCOUNT_SIGNIN_FULFILLED': {
            auth.setCookie('api.example.com',action.payload.data.token)
            return { ...state, fetching: false };
        }

        case 'ACCOUNT_SIGNIN_REJECTED': {
            return { ...state, fetching: false };
        }
        default: {
            return { ...state };
        }

        case 'ACCOUNT_SIGNOUT': {
            auth.removeCookie('api.example.com');
            return { ...initialState, isAuthenticated: false};
        }
    }
}