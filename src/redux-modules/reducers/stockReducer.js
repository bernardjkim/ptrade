import { stock } from 'redux-modules/actions/types';

const initialState = {
    symbol: '',
    dataOneDay: [],
    dataFiveYears: [],
    fetching: false,
}
export default function reducer(state = { ...initialState }, action) {
    switch (action.type) {

        //// GET ONE DAY

        case stock.GET_ONE_DAY_PENDING: {
            return { ...state, fetching: true };
        }
        case stock.GET_ONE_DAY_FULFILLED: {
            return {
                ...state,
                fetching: false,
                symbol: action.meta.symbol,
                dataOneDay: action.payload.data,
            };
        }
        case stock.GET_ONE_DAY_REJECTED: {
            return {
                ...state,
                fetching: false,
            };
        }

        //// GET FIVE YEARS

        case stock.GET_FIVE_YEARS_PENDING: {
            return { ...state, fetching: true };
        }
        case stock.GET_FIVE_YEARS_FULFILLED: {
            return {
                ...state,
                fetching: false,
                // symbol: action.meta.symbol,
                dataFiveYears: action.payload.data,
            };
        }
        // TODO: what to do if unable to get 5 year data
        case stock.GET_FIVE_YEARS_REJECTED: {
            return {
                ...state,
                fetching: false,
            };
        }

        
        default: {
            return {...state};
        }
    }
}
