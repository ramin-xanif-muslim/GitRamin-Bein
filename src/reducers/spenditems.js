import {
    FETCH_SPENDITEMS_FULFILLED,
    FETCH_SPENDITEMS_REJECTED,
    FETCH_SPENDITEMS_PENDING,


} from '../config/fetching';


export const initialState = {
    fetching: false,
    spendItems :[]
};
function spenditems(state = initialState, action) {

    switch (action.type) {

        case FETCH_SPENDITEMS_PENDING:
            return {
                ...state,
                fetching: true,
              
            };


        case FETCH_SPENDITEMS_FULFILLED:
            return {
                ...state,
                fetching: false,
                spendItems: action.payload.Body.List
            };

        case FETCH_SPENDITEMS_REJECTED:
            return {
                ...state,
                fetching: false,
                error: action.payload

            };
        default:
            return state;
    }

}

export default spenditems