import {
    FETCH_GROUPS_FULFILLED,
    FETCH_GROUPS_REJECTED,
    FETCH_GROUPS_PENDING,
    FETCH_FAST_GROUPS_FULFILLED,
    FETCH_FAST_GROUPS_REJECTED,
    FETCH_FAST_GROUPS_PENDING,
    FETCH_CUSTOMERS_FULFILLED,
    FETCH_CUSTOMERS_REJECTED,
    FETCH_CUSTOMERS_PENDING,
    FETCH_CUSTOMERS_FAST_PENDING,
    FETCH_CUSTOMERS_FAST_FULFILLED,
    FETCH_CUSTOMERS_FAST_REJECTED,
    FETCH_CUSTOMERS_DATA_PENDING,
    FETCH_CUSTOMERS_DATA_FULFILLED,
    FETCH_CUSTOMERS_DATA_REJECTED
} from '../config/fetching';

const initialState = {
    fetching: false,
    fastFetching: false,
    fetchData:false,
    groups: [],
    changePage: false,
    customers: [],
    loading: false,
    checkLoading: true,
    invoiceLoading:true,
    customerDebt: '',
    debtCustomerValue : '',
    customerLastTransaction: '',
    lang: 'eng'


};
function groups(state = initialState, action) {

    switch (action.type) {

        case FETCH_GROUPS_PENDING:
            return {
                ...state,
                fetching: true,
                loading:true,
            };


        case FETCH_CUSTOMERS_DATA_PENDING:
            return {
                ...state,
                fetchData:true,
                loading:true,
                checkLoading:true,
                


            };
        case FETCH_CUSTOMERS_DATA_FULFILLED:
            return {
                ...state,
                customerDebt: action.payload.Debt,
                customerLastTransaction: action.payload.LastTransaction,
                fetchData:false,
                loading:false,
                checkLoading:false



            };
            case 'UPDATE_CUSTOMER_VALUE':
                return {
                    ...state,
                    debtCustomerValue: action.payload.customerValue,
                    customerDebt: action.payload.customerValue,
                    customerLastTransaction:action.payload.customerValue,
                };
        case FETCH_GROUPS_FULFILLED:
            return {
                ...state,
                groups: action.payload.List,
                fetching: false,
                loading:false


            };
        case FETCH_GROUPS_REJECTED:
            return {

                ...state,
                error: action.payload
            };
        case FETCH_FAST_GROUPS_PENDING:
            return {
                ...state,
                fetching: true,
                loading:true

            };
        case FETCH_FAST_GROUPS_FULFILLED:
            return {
                ...state,
                customergroups: action.payload.List,
                fetching: false,
                loading:false



            };
        case FETCH_FAST_GROUPS_REJECTED:
            return {

                ...state,
                error: action.payload
            };
        case FETCH_CUSTOMERS_PENDING:
            return {
                ...state,
                fetching: true,
                loading:true,
                invoiceLoading:true

            };
        case FETCH_CUSTOMERS_FULFILLED:
            return {
                ...state,
                customers: action.payload.List,
                fetching: false,
                loading:false,
                invoiceLoading:false



            };
        case FETCH_CUSTOMERS_REJECTED:
            return {

                ...state,
                error: action.payload
            };

        case FETCH_CUSTOMERS_FAST_PENDING:
            return {
                ...state,
                fastFetching: true,
                loading:true

            };
        case FETCH_CUSTOMERS_FAST_FULFILLED:
            return {
                ...state,
                customers: action.payload.List,
                fastFetching: false,
                loading:false



            };
        case FETCH_CUSTOMERS_FAST_REJECTED:
            return {

                ...state,
                error: action.payload
            };
        default:
            return state;
    }

}

export default groups