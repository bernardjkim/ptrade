import axios from 'axios';
// import qs from 'qs';

import { referenceData } from 'redux-modules/actions/types';

// const apiURL = 'https://bjstock.herokuapp.com';
const iexURL = 'https://api.iextrading.com/1.0/ref-data/symbols';

export function getSymbols() {
    const url = iexURL; 
    const request = {
        method: 'GET',
        url: url,
    }

    return function (dispatch) {
        dispatch({
            type: referenceData.GET_REFERENCE_DATA_SYMBOLS,
            payload: axios(request),
            meta: {url: url},
        })
            .catch(error => {
                console.log(error);
            });
    }
}

