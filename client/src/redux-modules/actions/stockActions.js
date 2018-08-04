import axios from 'axios';
import qs from 'qs';

import { stock } from 'redux-modules/actions/types';

const apiURL = 'https://bjstock.herokuapp.com';

export function getHistory(symbol) {
    const request = {
        method: 'POST',
        url: apiURL + '/stock/gethistory',
        data: qs.stringify({ symbol: symbol }),
    }

    return function (dispatch) {
        dispatch({
            type: stock.GET_HISTORY,
            payload: axios(request),
        })
            .catch(error => {
                console.log(error);
            });
    }
}