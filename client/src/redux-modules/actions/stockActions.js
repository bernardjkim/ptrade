import axios from 'axios';
// import qs from 'qs';

import { stock } from 'redux-modules/actions/types';

// const apiURL = 'https://bjstock.herokuapp.com';
const iexURL = 'https://api.iextrading.com/1.0/stock';

// example request: https://api.iextrading.com/1.0/stock/aapl/chart/1d


// TODO: for now only grabbing 1 day data every 5 minutes
export function getOneDay(symbol) {
    const url = iexURL + '/' + symbol + '/chart/1d?chartInterval=5'; 
    const request = {
        method: 'GET',
        url: url,
    }

    return function (dispatch) {
        dispatch({
            type: stock.GET_ONE_DAY,
            payload: axios(request),
            meta: {symbol: symbol, url: url},
        })
            .then((response) => {
                dispatch(getFiveYears(symbol))
            })
            .catch(error => {
                console.log(error);
            });
    }
}


function getFiveYears(symbol) {
    const url = iexURL + '/' + symbol + '/chart/5y'; 
    const request = {
        method: 'GET',
        url: url,
    }

    return function (dispatch) {
        dispatch({
            type: stock.GET_FIVE_YEARS,
            payload: axios(request),
            meta: {symbol: symbol, url: url},
        })
            .catch(error => {
                console.log(error);
            });
    }
}