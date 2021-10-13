import { API_BASE } from '../config/env';
import axios from 'axios';
import { getToken } from '../config/token';
import { getProtectedThing } from '../config/token';
export const UPDATE_SUBHEADER = 'UPDATE_SUBHEADER';
export const UPDATE_UPPERHEADER = 'UPDATE_UPPERHEADER';







export function updateSubheader(activeItemId, activeItem) {
    return {
        type: UPDATE_SUBHEADER,
        payload: {
            id: activeItemId,
            name: activeItem
        }
    }
}

export function changeSubMenu(name) {
    return {
        type: 'CHANGE_SUBMENU',
        payload: {
            submenu: name,
        }
    }
}

export function updateUpperheader(activeItem, activefrom) {
    return {
        type: UPDATE_UPPERHEADER,
        payload: {
            nameupper: activeItem,
            from: activefrom ?  activefrom : undefined
        }
    }
}


export function updateTokenSessionExpired(bool) {
    return {
        type: 'UPDATE_TOKEN_EXPIRED',
        payload: {
            expiredToken: bool
        }
    }
}
export default function getNavbar() {
    return dispatch => {
        dispatch({
            type: 'FETCH_MENU',
            payload: axios.post(`${API_BASE}/menu/get.php`, {
                token: JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).Token : ''
            })
                .then(result => result.data)
                .then(data => {
                    if (data.Headers.ResponseStatus === '104') {
                        dispatch(updateTokenSessionExpired(true))
                    }

                    return data.Body
                })
        })


    }
}

