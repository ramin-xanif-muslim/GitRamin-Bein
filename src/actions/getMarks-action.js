import { API_BASE } from '../config/env';
import axios from 'axios';
import filterMark from '../config/filterMark';
import { getToken } from '../config/token';

export const FETCH_MARK = 'FETCH_MARK'




export function createNewMark(id) {
    return {
        type: 'UPDATE_MARK_ID',
        payload: {
            newMarkId: id
        }
    }
}


export function putMark(dataObject) {
    return dispatch => {
        dispatch({
            type: 'PUT_MARK',
            payload: axios.post(`${API_BASE}/marks/edit.php`,
                dataObject
            ).then(result => result.data)
                .then(data => {
                    dispatch(data.Body.ResponseStatus === '0' ? createNewMark(data.Body.ResponseService) : createNewMark(''))
                    dispatch(data.Body.ResponseStatus === '0' ? getMarks() : '')
                })
        })
    }
}

export function delMark(id) {
    return dispatch => {
        dispatch({
            type: 'DEL_MARK',
            payload: axios.post(`${API_BASE}/marks/del.php?id=${id}`,
                {token : JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).Token : ''}
            ).then(result => result.data)
                .then(data => {
                    dispatch(getMarks())
                })
        })
    }
}


export default function getMarks() {
    filterMark.token = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).Token : ''
    return dispatch => {
        dispatch({
            type: FETCH_MARK,
            payload: axios.post(`${API_BASE}/marks/get.php`,
                filterMark
            ).then(result => result.data)
                .then(data => data)
        })
    }
}