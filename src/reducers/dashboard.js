import {
    FETCH_DASHBOARD_REJECTED,
    FETCH_DASHBOARD_PENDING,
    FETCH_DASHBOARD_FULFILLED

} from '../config/fetching';


export const initialState = {
    fetching: false,
    loading: false,
    dashboardMenu:[]
};
function dashboard(state = initialState, action) {

    switch (action.type) {

       
        case FETCH_DASHBOARD_PENDING:
            return {
                ...state,
                fetching: true,
                changePage: true,
                loading: true
            }


        case FETCH_DASHBOARD_FULFILLED:
            return {
                ...state,
                fetching: false,
                changePage:false,
                loading:false,
                dashboardMenu : action.payload.Body.cards,
                dashboardChart : action.payload.Body.saleChart
            }


         
    
        default:
            return state;
    }

}

export default dashboard