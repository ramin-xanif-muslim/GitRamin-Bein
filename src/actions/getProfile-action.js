import { API_BASE } from '../config/env';
import axios from 'axios';
import { getToken } from '../config/token';


export function fetchProfile(controllerName, object) {
    object.token = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).Token : ''
    return dispatch => {
        dispatch({
            type: 'FETCH_PROFILE',
            payload: axios.post(`${API_BASE}/` + controllerName + `/get.php`,
                object 
            ).then(result => result.data)
                .then(data => data)
        })

    }
}


export function putProfile(controllerName, object) {
    object.token = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).Token : ''
    return dispatch => {
        dispatch({
            type: 'PUT_PROFILE',
            payload: axios.post(`${API_BASE}/` + controllerName + `/put.php`,
                object 
            ).then(result => result.data)
                .then(data => data.Body.ResponseStatus === '0' ? dispatch(fetchProfile('company',{token:JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).Token : ''})) : console.log(data.Body))
        })

    }
}