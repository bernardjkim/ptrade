import axios from 'axios';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export function setFirstName(firstName) {
    return {
        type: 'SET_FIRST_NAME',
        payload: firstName,
    }
}

export function setLastName(lastName) {
    return {
        type: 'SET_LAST_NAME',
        payload: lastName,
    }
}

export function fetchAccount() {
    const authRequest = {
        method: 'GET',
        url: 'http://localhost:8080/auth/check',
        headers: { 'X-App-Token': cookies.get('api.example.com') },
    }

    return function (dispatch) {
        dispatch({
            type: 'FETCH_ACCOUNT',
            payload: axios(authRequest),
        });

    }
    // axios(authRequest)
    //     .then((response) => {
    //         dispatch({ type: 'FETCH_ACCOUNT_FULFILLED', response.data})
    //     })
    //     .catch((error) => {
    //         dispatch({ type: 'FETCH_ACCOUNT_REJECTED', error })
    //     });
}