const initialState = {
    notifications: [],
    AccountBalance: ''
};

function notifications(state = initialState, action) {

    switch (action.type) {

        case 'GET_NOTIFICATION_FULFILLED':
            return {
                ...state,
                AccountBalance: action.payload.AccountBalance,
            };




        default:
            return state;
    }

}

export default notifications