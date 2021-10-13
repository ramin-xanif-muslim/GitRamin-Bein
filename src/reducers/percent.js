
import { initialState } from '../config/fetching'

function percent(state =initialState, action) {

    switch (action.type) {

        case 'UPDATE_PRICE':
            return {
                ...state,
                price:action.payload.price
            };
        default:
            return state;
    }

}

export default percent