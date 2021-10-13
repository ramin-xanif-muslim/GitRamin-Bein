import { UPDATE_LANGUAGE } from '../actions/getLang-action'
import { initialState } from '../config/fetching'
function langs(state = initialState, action) {

    switch (action.type) {

        case UPDATE_LANGUAGE:
            return {
                ...state,
                lang:action.payload.lang,
            };
        default:
            return state;
    }

}

export default langs