import axios from 'axios';
import { API_BASE } from '../../config/env';
import { getToken } from '../../config/token';
import { fetchData } from '../getData-action';




export function saveDepartment(object, objectForPage, pagename) {
    return dispatch => {
        dispatch({
            type: 'SAVE_DEPARTMENT',
            payload: axios.post(`${API_BASE}/departments/put.php`,
                object
            ).then(result => result.data)
                .then(data => data.Body.ResponseStatus === '0' ? dispatch(fetchData(pagename,objectForPage)) : alert('sehv'))

        })

    }
}




export function deleteDepartment(object, id) {
    return dispatch => {
        dispatch({
            type: 'DELETE_DEPARTMENT',
            payload: axios.post(`${API_BASE}/departments/del.php?id=` + id,
                object
            ).then(result => result.data)
                .then(data => console.log(data))
        })

    }
}
