import {
    FETCH_OWNERS_FULFILLED,
    FETCH_OWNERS_REJECTED,
    FETCH_OWNERS_PENDING,
    FETCH_DEPARTMENTS_FULFILLED,
    FETCH_DEPARTMENTS_REJECTED,
    FETCH_DEPARTMENTS_PENDING,

} from '../config/fetching';
const initialState = {
    fetching: false,
    owners: [],
    departments: [],
    changePage: false,
    loading: true,
    lang: 'eng'


};


function owdep(state = initialState, action) {

    switch (action.type) {

        case FETCH_OWNERS_PENDING:
            return {
                ...state,
                fetching: true,
            };
        case FETCH_OWNERS_FULFILLED:
            return {
                ...state,
                owners: action.payload.List,
                fetching: false,


            };
        case FETCH_OWNERS_REJECTED:
            return {

                ...state,
                error: action.payload
            };



            case FETCH_DEPARTMENTS_PENDING:
                return {
                    ...state,
                    fetching: true,
                };
            case FETCH_DEPARTMENTS_FULFILLED:
                return {
                    ...state,
                    departments: action.payload.List,
                    fetching: false,
    
    
                };
            case FETCH_DEPARTMENTS_REJECTED:
                return {
    
                    ...state,
                    error: action.payload
                };
      
        
        default:
            return state;
    }

}

export default owdep