function colnameschecked(state = [], action) {
    switch (action.type) {
            case 'UPDATE_COLNAMECHECKED':
                return {
                    updatedcolschecked: action.payload.newcolschecked
                };
        default:
            return state;
    }
}
export default colnameschecked