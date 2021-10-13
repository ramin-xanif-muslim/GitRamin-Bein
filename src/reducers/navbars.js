import { FETCH_MENU_FULFILLED, FETCH_MENU_REJECTED, FETCH_MENU_PENDING } from '../config/fetching';

import { UPDATE_SUBHEADER, UPDATE_UPPERHEADER } from '../actions/getNavbar-action'

export const initialStateNavbar = {
    navbar: [],
    id: '1',
    activeItem: 'Göstəricilər',
    activeSubItem: 'Əsas',
    activeFrom: undefined,
    fetching: true

}

function navbar(state = initialStateNavbar, action) {

    switch (action.type) {

        case FETCH_MENU_PENDING:
            return {
                ...state,
                fetching: true
            };
        case 'CHANGE_SUBMENU':
            return {
                ...state,
                submenu: action.payload.submenu,
            };


        case FETCH_MENU_FULFILLED:
            return {
                ...state,
                navbar: action.payload,
                fetching: false,

            };
        case FETCH_MENU_REJECTED:
            return {

                ...state,
                error: action.payload
            };
        case UPDATE_SUBHEADER:
            return {
                ...state,
                id: action.payload.id,
                activeItem: action.payload.name

            }


        case UPDATE_UPPERHEADER:
            return {
                ...state,
                activeSubItem: action.payload.nameupper,
                activeFrom: action.payload.from,
            }
        case 'CLEAR_NAV':
            return {
                ...initialStateNavbar,
            }

        default:
            return state;
    }

}

export default navbar