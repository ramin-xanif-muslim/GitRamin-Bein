import { FETCH_CUSTOMER_GROUPS_MODAL_PENDING, FETCH_CUSTOMER_GROUPS_MODAL_FULFILLED, FETCH_CUSTOMER_GROUPS_MODAL_REJECTED, FETCH_STOCKS_GROUPS_MODAL_PENDING, FETCH_STOCKS_GROUPS_MODAL_FULFILLED, FETCH_STOCKS_GROUPS_MODAL_REJECTED, FETCH_PRODUCTS_MODAL_PENDING, FETCH_PRODUCTS_MODAL_FULFILLED, FETCH_PRODUCTS_MODAL_REJECTED, FETCH_PRODUCTS_GROUP_MODAL_PENDING, FETCH_PRODUCTS_GROUP_MODAL_FULFILLED, FETCH_PRODUCTS_GROUP_MODAL_REJECTED } from "../../config/fetching";
const initialState = {
    fetching: false,
    customerGroups: [],
    products: [],
    productGroups: [],
    stockGroups: [],
    localStates: []
};

function docmodals(state = initialState, action) {
    switch (action.type) {


        case FETCH_CUSTOMER_GROUPS_MODAL_PENDING:
            return {
                ...state,
                fetching: true,
            };

        case FETCH_STOCKS_GROUPS_MODAL_PENDING:
            return {
                ...state,
                fetching: true,
            };

        case 'UPDATE_NEW_GROUP':
            return {
                ...state,
                newGroup : action.payload.newGroup,
                newGroupId : action.payload.newGroupId,
            };


        case FETCH_PRODUCTS_MODAL_PENDING:
            return {
                ...state,
                fetching: true,
            };

        case FETCH_PRODUCTS_GROUP_MODAL_PENDING:
            return {
                ...state,
                fetching: true,
            };

        case FETCH_CUSTOMER_GROUPS_MODAL_FULFILLED:
            return {
                ...state,
                customerGroups: action.payload.List,
                fetching: false,
            };
        case FETCH_PRODUCTS_GROUP_MODAL_FULFILLED:
            return {
                ...state,
                productGroups: action.payload.List,
                fetching: false,
            };
        case FETCH_PRODUCTS_MODAL_FULFILLED:
            return {
                ...state,
                products: action.payload.List,
                fetching: false,
            };
        case FETCH_STOCKS_GROUPS_MODAL_FULFILLED:
            return {
                ...state,
                stockGroups: action.payload.List,
                fetching: false,
            };

        case FETCH_STOCKS_GROUPS_MODAL_REJECTED:
            return {
                ...state,
                fetching: true,
                error: action.payload
            };

        case FETCH_CUSTOMER_GROUPS_MODAL_REJECTED:
            return {
                ...state,
                fetching: true,
                error: action.payload
            };



        case 'UPDATE_LOCAL_STATES':
            return {
                ...state,
                localStates: action.payload.formvalues,
                localProduct: action.payload.newProduct,
                newid: action.payload.newid


            };


        default:
            return state;
    }



}

export default docmodals