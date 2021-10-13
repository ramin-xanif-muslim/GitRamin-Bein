import { API_BASE } from '../../config/env';
import axios from 'axios';
import { getToken } from '../../config/token';



export function getFilterDatas(controllerName) {
    return dispatch => {
        dispatch({
            type: 'FETCH_FILTER_DATAS',
            payload: axios.post(`${API_BASE}/` + controllerName + `/get.php`, {
                token: JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).Token : '',
            }).then(result => result.data)
                .then(data => data.Body)
        })

    }
}


export function getFilterFastDatas(val, controllerName) {
    return dispatch => {
        dispatch({
            type: 'FETCH_FILTER_FAST_DATAS',
            payload: axios.post(`${API_BASE}/` + controllerName + `/getfast.php`, {
                token: JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).Token : '', fast: val,
            }).then(result => result.data)
                .then(data => data.Body)
        })

    }
}
