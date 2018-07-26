
export default function reducer(state={
    account: {
        firstName: '',
        lastName: '',
        email: '',
    }
}, action) {
    switch (action.type) {
        case 'FETCH_ACCOUNT_PENDING': {
            return {...state, fetching: true};
        }
        case 'FETCH_ACCOUNT_FULFILLED': {
            console.log(action.payload);
            return {...state, 
                fetching: false,
            };
        }
        case 'FETCH_ACCOUNT_REJECTED': {
            console.log(action.payload);
            return {...state, 
                fetching: false,
            };
        }
        case 'SET_FIRST_NAME': {
            return {...state, firstName: action.payload};
        }
        case 'SET_LAST_NAME': {
            return {...state, lastName: action.payload};
        }
        case 'SET_EMAIL': {
            return {...state, email: action.payload};
        }
        default: {
            return {...state};
        }
    }
}