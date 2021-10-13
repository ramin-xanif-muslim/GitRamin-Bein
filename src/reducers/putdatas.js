import { PUT_DATA_FULFILLED, PUT_DATA_REJECTED, PUT_DATA_PENDING, PUT_DATA_CUSTOMER_PENDING, PUT_DATA_CUSTOMER_FULFILLED, PUT_DATA_CUSTOMER_REJECTED, PUT_DATA_STOCK_PENDING, PUT_DATA_STOCK_FULFILLED, PUT_DATA_STOCK_REJECTED, PUT_DATA_FROMSTOCK_PENDING, PUT_DATA_FROMSTOCK_FULFILLED, PUT_DATA_FROMSTOCK_REJECTED, PUT_DATA_PRODUCT_PENDING, PUT_DATA_PRODUCT_FULFILLED, PUT_DATA_PRODUCT_REJECTED } from '../config/fetching';
import { initialState } from '../reducers/datas';

function putdatas(state = initialState, action) {

    switch (action.type) {

        case PUT_DATA_PENDING:
            return {
                ...state,
                fetching: true,
                fetchingSave: true,
                send: true,
            };
        case PUT_DATA_CUSTOMER_PENDING:
            return {
                ...state,
                fetching: true,
            };


        case PUT_DATA_PRODUCT_PENDING:
            return {
                ...state,
                fetching: true,
            };
        case PUT_DATA_STOCK_PENDING:
            return {
                ...state,
                fetching: true,
            };

        case PUT_DATA_FROMSTOCK_PENDING:
            return {
                ...state,
                fetching: true,
            };

        case 'SAVE_DOC':
            return {
                ...state,
                save: true
            };


        case 'ISDELETED':
            return {
                ...state,
                isdeleted: action.payload.isdeleted
            };
        case 'DEL_REDIRECT':
            return {
                ...state,
                redirectDelete: action.payload.redirectDelete,
            };

        case PUT_DATA_FULFILLED:
            console.log(action.payload.Body)
            return {
                ...state,
                responseId: action.payload.Body,
                responseStatus: action.payload.Headers.ResponseStatus,
                fetching: false,
                fetchingSave: false,
                send: true,

            };

        case PUT_DATA_STOCK_FULFILLED:
            return {
                ...state,
                responseStockId: action.payload.Body,
                fetching: false,
                send: true,
            };
        case PUT_DATA_FROMSTOCK_FULFILLED:
            return {
                ...state,
                responseFromStockId: action.payload.Body,
                fetching: false,
                send: true,
            };


        case PUT_DATA_PRODUCT_FULFILLED:
            return {
                ...state,
                responseProductId: action.payload.Body,
                send: true,
            };

        case PUT_DATA_CUSTOMER_FULFILLED:
            return {
                ...state,
                fetching: false,
                responseCustomerId: action.payload.Body,
                send: true,

            };
        case 'DELETE_RESPONSE':
            return {
                ...state,
                responseId: action.payload.responseId,
                send: false,

            };
        case PUT_DATA_REJECTED:
            return {

                ...state,
                send: false,
                fetching: false,
                error: action.payload
            };

        default:
            return state;
    }

}

export default putdatas