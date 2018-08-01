import { stock } from '../actions/types';

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