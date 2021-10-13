import { UPDATE_CHANGED } from '../actions/updateChanged-action'
import { initialState } from '../config/fetching'
function changed(state = initialState, action) {

    switch (action.type) {

        case UPDATE_CHANGED:
            return {
                ...state,
                changed:action.payload.changed,
                redirect:action.payload.redirect
            };
        default:
            return state;
    }

}

export default changed