import {
    FETCH_PROFILE_FULFILLED,
    FETCH_PROFILE_REJECTED,
    FETCH_PROFILE_PENDING,


} from '../../config/fetching';


const initialState = {
    fetching: true,
    profile: []

};



function profile(state = initialState, action) {

    switch (action.type) {

        case FETCH_PROFILE_PENDING:
            return {
                ...state,
                fetching: true,
            };


        case FETCH_PROFILE_FULFILLED:
            return {
                ...state,
                profile: action.payload.Body,
                fetching: false,
            };
        case FETCH_PROFILE_REJECTED:
            return {
                ...state,
                fetching: false,
                error: action.payload
            };
        default:
            return state;
    }

}

export default profile