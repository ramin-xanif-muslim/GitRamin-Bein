const initialState = {
    loading: true,
    prices: []

};

function prices(state = initialState, action) {

    switch (action.type) {

        case 'FETCH_PRICES_PENDING':
            return {
                ...state,
                loading: true,
            };

        case 'FETCH_PRICES_FULFILLED':
            return {
                ...state,
                loading: false,
                prices: action.payload.Body.List,
            };


        default:
            return state;
    }

}

export default prices