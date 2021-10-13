import { UPDATE_PRODUCT, DELETE_PRODUCT, UPDATE_CUSTOMER, DELETE_CUSTOMER } from '../config/fetching'


const initialState = {
    selectedProduct: [],
    add:false,
    error: [],
    checkClickInput : false
}
function handleProduct(state = initialState, action) {
    console.log(action)
    switch (action.type) {
        case UPDATE_PRODUCT:
            return {
                ...state,
                selectedProduct: action.payload.product[0],
                checkBarcode: action.payload.checkBarcode,
                changedPositions : action.payload.changedPositions
            };

            case UPDATE_CUSTOMER:
                return {
                    ...state,
                    selectedCustomer: action.payload.customer[0],
                };
            case 'UPDATE_POSITIONS':
                return {
                    ...state,
                    checkClickInput : action.payload.checkClickInput,
                    selectedProduct : action.payload.positions,
                    add:true,
                };
        case DELETE_PRODUCT:
            return {
                ...state,
                selectedProduct: action.payload.product,
                checkBarcode: false

            };
            case DELETE_CUSTOMER:
                return {
                    ...state,
                    selectedProduct: action.payload.customer,
    
                };
        default:
            return state;
    }

}

export default handleProduct