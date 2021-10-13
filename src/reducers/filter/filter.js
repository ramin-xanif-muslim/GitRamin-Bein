import { FETCH_FILTER_DATAS_PENDING, FETCH_FILTER_DATAS_FULFILLED, FETCH_FILTER_DATAS_REJECTED } from "../../config/fetching";
const initialState = {
    fetching: false,
    filterDatas: [],
    isOpen: false,
};

function filters(state = initialState, action) {
    switch (action.type) {


        case FETCH_FILTER_DATAS_PENDING:
            return {
                ...state,
                fetching: true,
            };

        case FETCH_FILTER_DATAS_FULFILLED:
            return {
                ...state,
                filterDatas: action.payload.List,
                fetching: false,
            };

        case 'FETCH_FILTER_FAST_DATAS_FULFILLED':
            return {
                ...state,
                filterDatas: action.payload.List,
                fetching: false,
            };

        case FETCH_FILTER_DATAS_REJECTED:
            return {
                ...state,
                fetching: true,
                error: action.payload
            };
        case 'OPEN_FILTER':
            return {
                ...state,
                isOpen: action.payload.isOpen
            };









        default:
            return state;
    }



}

export default filters