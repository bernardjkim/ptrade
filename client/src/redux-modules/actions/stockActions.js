import axios from 'axios';
import qs from 'qs';

import { stock } from './types';

export function getHistory(symbol) {
    const request = {
        method: 'Post',
        url: 'http://localhost:8080/stock/gethistory',
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