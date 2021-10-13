import { API_BASE } from '../../config/env';
import axios from 'axios';
import { getToken } from '../../config/token';
import { fetchData } from '../getData-action';

export function getNotification() {
    return dispatch => {
        dispatch({
            type: 'GET_NOTIFICATION',
            payload: axios.post(`${API_BASE}/notifications/get.php`,
                { token: JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).Token : '' }
            ).then(result => result.data)
                .then(data => data.Body)
        })

    }
}
