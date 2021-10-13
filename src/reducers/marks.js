import {
    FETCH_MARK_PENDING,
    FETCH_MARK_FULFILLED,
    FETCH_MARK_REJECTED,
} from '../config/fetching'
import { initialState } from '../config/fetching'
function marks(state = initialState, action) {

    switch (action.type) {

        case FETCH_MARK_PENDING:
            return {
                ...state,
                markLoading: true,
                loading: true

            };
        case 'UPDATE_MARK_ID':
            return {
                ...state,
                newMarkId: action.payload.newMarkId,
            }
        case FETCH_MARK_FULFILLED:
            return {
                ...state,
                marks: action.payload ? action.payload.Body.List : [],
                markLoading: false
            };
        case FETCH_MARK_REJECTED:
            return {
                ...state,
                error: action.payload,
                markLoading: false


            };

        default:
            return state;
    }

}

export default marks