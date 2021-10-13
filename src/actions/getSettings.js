import { API_BASE } from '../config/env';
import axios from 'axios';
import settingObject from '../config/settingObject';



export default function getSetting(message) {
    return dispatch => {
        settingObject.hash = message;

        dispatch({
            type: 'FETCH_SETTINGS',
            payload: axios.post(`${API_BASE}/settings/get.php`,
            settingObject
            ).then(result => result.data)
                .then(data => data)
        })
    }
}