
const initialState = {
    expired: false,
};

function expired(state = initialState, action) {

    switch (action.type) {

        case 'UPDATE_TOKEN_EXPIRED':
            return {
                ...state,
                expired: action.payload.expiredToken
            };

        default:
            return state;
    }

}

export default expired