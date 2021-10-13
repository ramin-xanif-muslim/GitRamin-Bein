import {
    FETCH_LINKS_PENDING,
    FETCH_LINKS_FULFILLED,
    FETCH_LINKS_REJECTED,
} from '../config/fetching'
import { initialState } from '../config/fetching'
function links(state = initialState, action) {

    switch (action.type) {

        case FETCH_LINKS_PENDING:
            return {
                ...state,
                linkLoading: true

            };
        case FETCH_LINKS_FULFILLED:
            return {
                ...state,
                links: action.payload.Body.List,
                linkLoading : false
            };
        case FETCH_LINKS_REJECTED:
            return {
                ...state,
                error: action.payload,
                linkLoading : false


            };

        default:
            return state;
    }

}

export default links