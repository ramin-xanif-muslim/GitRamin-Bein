function colnames(state = [], action) {
    switch (action.type) {
        case 'UPDATE_COLNAME':
            return {
                updatedcols: action.payload.newcols,
            };
    
        default:
            return state;
    }
}
export default colnames