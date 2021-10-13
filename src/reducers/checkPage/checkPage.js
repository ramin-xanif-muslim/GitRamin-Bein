
const initialState = {
    show: false,
};

function checkPage(state = initialState, action) {

    switch (action.type) {

        case 'CHECK_PAGE':
            return {
                ...state,
                show: action.payload.show
            };

        default:
            return state;
    }

}

export default checkPage