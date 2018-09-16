import { referenceData } from 'redux-modules/actions/types';

const initialState = {
    dataSymbols: [],
    fetching: false,
}
export default function reducer(state = { ...initialState }, action) {
    switch (action.type) {

        //// GET REFERENCE DATA SYMBOLS

        case referenceData.GET_REFERENCE_DATA_PENDING: {
            return { ...state, fetching: true };
        }
        case referenceData.GET_REFERENCE_DATA_FULFILLED: {
            return {
                ...state,
                fetching: false,
                dataSymbols: action.payload.data,
            };
        }
        case referenceData.GET_REFERENCE_DATA_REJECTED: {
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
