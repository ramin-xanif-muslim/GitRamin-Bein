import axios from 'axios';
import { API_BASE } from '../../config/env';
import { getToken } from '../../config/token';
import { fetchData } from '../getData-action';




export function saveSpendItems(object, objectForPage, pagename) {
    return dispatch => {
        dispatch({
            type: 'SAVE_SPENDITEMS',
            payload: axios.post(`${API_BASE}/spenditems/put.php`,
                object
            ).then(result => result.data)
                .then(data => data.Body.ResponseStatus === '0' ? dispatch(fetchData(pagename,objectForPage)) : alert('sehv'))

        })

    }
}




export function deleteSpendItems(object, id) {
    return dispatch => {
        dispatch({
            type: 'DELETE_SPENDITEMS',
            payload: axios.post(`${API_BASE}/spenditems/del.php?id=` + id,
                object
            ).then(result => result.data)
                .then(data => data.Body.ResponseStatus === '0' ? dispatch(fetchData('spenditems',object)) : alert('sehv'))
        })

    }
}
