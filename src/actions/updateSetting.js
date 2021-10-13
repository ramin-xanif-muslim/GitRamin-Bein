import { API_BASE } from '../config/env';
import axios from 'axios';
import settingObject from '../config/settingObject';


export default function updateSettings(data) {
    return dispatch => {
		settingObject.data = data
        dispatch({
            type: 'UPDATE_SETTINGS',
            payload: axios.post(`${API_BASE}/settings/put.php`,
			settingObject
            ).then(result => result.data)
                .then(data => data)
        })
    }
}
