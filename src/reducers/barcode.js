import {
    FETCH_BARCODE_PENDING,
    FETCH_BARCODE_FULFILLED,
    FETCH_BARCODE_REJECTED,
    FETCH_CARD_PENDING,
    FETCH_CARD_FULFILLED,
    FETCH_CARD_REJECTED,
    DELETE_BARCODE

} from '../config/fetching'
import { initialState } from '../config/fetching'
function barcode(state = initialState, action) {

    switch (action.type) {

        case FETCH_BARCODE_PENDING:
            return {
                ...state,
            };
        case FETCH_BARCODE_FULFILLED:
            return {
                ...state,
                barcode: action.payload.Body
            };
        case FETCH_BARCODE_REJECTED:
            return {
                ...state,
                error: action.payload
            };

            case DELETE_BARCODE:
                return {
                    ...state,
                    barcode: action.payload.barcode
                };
        case FETCH_CARD_PENDING:
            return {
                ...state,
            };
        case FETCH_CARD_FULFILLED:
            return {
                ...state,
                card: action.payload.Body
            };
        case FETCH_CARD_REJECTED:
            return {

                ...state,
                error: action.payload
            };
        default:
            return state;
    }

}

export default barcode