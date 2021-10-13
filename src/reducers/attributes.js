import {
    FETCH_REFLIST_FULFILLED,
    FETCH_REFLIST_REJECTED,
    FETCH_REFLIST_PENDING,


    FETCH_ATTRIBUTES_FULFILLED,
    FETCH_ATTRIBUTES_REJECTED,
    FETCH_ATTRIBUTES_PENDING,


} from '../config/fetching';


export const initialState = {
    fetching: false,
    send: false,
    datas: [],
    reflist: [],
    attributes: [],
    refLoading: false,
    headerDatas: [],
    error: {},
    columns: [],
    changePage: false,
    loading: true,
    lang: 'eng',
    barcode: false,
    pagePositions: [],
    additionalInfo: [],
    secondaryDatas: []




};
function attributes(state = initialState, action) {

    switch (action.type) {

        case FETCH_REFLIST_PENDING:
            return {
                ...state,
                fetching: true,
                refLoading: true
            };


        case FETCH_REFLIST_FULFILLED:
            console.log(action.payload.Body.List)
            return {
                ...state,
                refLoading: false,
                reflist: [...state.reflist, ...action.payload.Body.List] 
            };

        case FETCH_REFLIST_REJECTED:
            return {
                ...state,
                error: action.payload

            };


        case FETCH_ATTRIBUTES_PENDING:
            return {
                ...state,
                fetching: true,
                loading: true
            };


        case FETCH_ATTRIBUTES_FULFILLED:
            return {
                ...state,
                attributes: action.payload.Body.List
            };

        case FETCH_ATTRIBUTES_REJECTED:
            return {
                ...state,
                error: action.payload

            };
        default:
            return state;
    }

}

export default attributes