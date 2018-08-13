import { stock } from 'redux-modules/actions/types';

const initialState = {
    symbol: '',
    data: [],
    fetching: false,
}
export default function reducer(state = { ...initialState }, action) {
    switch (action.type) {

        //// GET HISTORY

        case stock.GET_HISTORY_PENDING: {
            return { ...state, fetching: true };
        }
        case stock.GET_HISTORY_FULFILLED: {
            return {
                ...state,
                fetching: false,
                symbol: action.payload.data.stockdata[0].symbol,
                data: action.payload.data.stockdata,
            };
        }
        case stock.GET_HISTORY_REJECTED: {
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
