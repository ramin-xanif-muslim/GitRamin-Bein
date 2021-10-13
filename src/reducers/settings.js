
import {
    FETCH_SETTINGS_FULFILLED,
    FETCH_SETTINGS_REJECTED,
    FETCH_SETTINGS_PENDING,
    FETCH_UPDATE_SETTINGS_REJECTED,
    FETCH_UPDATE_SETTINGS_FULFILLED,
    FETCH_UPDATE_SETTINGS_PENDING


} from '../config/fetching';


const seetingsState = {
    fetching: false,
    setting: true
}
function settings(state = seetingsState, action) {

    switch (action.type) {

        case FETCH_SETTINGS_PENDING:
            return {
                ...state,
                fetching: true,
                setting: true,
            };
        case FETCH_SETTINGS_FULFILLED:
            return {
                ...state,
                fetching: false,
                getsetting: action.payload.Body,
                setting: false

            };
        case FETCH_SETTINGS_REJECTED:
            return {
                ...state,
                fetching: false,
                error: action.payload,
                setting: false

            };

        case FETCH_UPDATE_SETTINGS_FULFILLED:
            return {
                settings: action.payload.bODY,
                setting: false
            };

        default:
            return state;
    }

}

export default settings