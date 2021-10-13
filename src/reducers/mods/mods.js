const initialState = {
    linkedRefList: [],
    refTypes: [],
    loadingTypes: true,
    loading: true,
    pageloading: true,
    pageRefTypes: []
};

function mods(state = initialState, action) {

    switch (action.type) {

        case 'FETCH_REFLISTS_PENDING':
            return {
                ...state,
                loading: true,
            };

        case 'GET_PAGE_PENDING':
            return {
                ...state,
                pageloading: true,
            };
        case 'SAVE_ATTR_PENDING':
            return {
                ...state,
                pageloading: true,
            };
        case 'DELETE_ATTR_PENDING':
            return {
                ...state,
                pageloading: true,
            };
        case 'GET_PAGE_FULFILLED':
            return {
                ...state,
                pageloading: false,
                refTypes: action.payload.Body.List
            };
        case 'FETCH_REFTYPES_PENDING':
            return {
                ...state,
                loadingTypes: true,
            };

        case 'FETCH_REFTYPES_FULFILLED':
            return {
                ...state,
                loadingTypes: false,
                refTypes: action.payload.Body.List,

            };

        case 'SAVE_REFLIST_PENDING':
            return {
                ...state,
                loading: true,
            }

        case 'SAVE_REFTYPES_PENDING':
            return {
                ...state,
                loadingTypes: true,
            }

        case 'DELETE_REFTYPES_PENDING':
            return {
                ...state,
                loadingTypes: true,
            }

        case 'DELETE_REFLIST_PENDING':
            return {
                ...state,
                loading: true,
            }
        case 'SAVE':
            return {
                ...state,
                loading: true,
            }
        case 'SAVETYPE':
            return {
                ...state,
                loadingTypes: true,
            }
        case 'FETCH_REFLISTS_FULFILLED':
            return {
                ...state,
                linkedRefList: action.payload.Body.List,
                loading: false,
            };


        default:
            return state;
    }

}

export default mods