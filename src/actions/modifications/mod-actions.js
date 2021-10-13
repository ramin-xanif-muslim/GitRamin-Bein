import { API_MODS } from '../../config/env';
import axios from 'axios';
import { getToken } from '../../config/token';
import { fetchData } from '../getData-action';




export function getModPage(object, pagename) {
    return dispatch => {
        dispatch({
            type: 'GET_PAGE',
            payload: axios.post(`${API_MODS}/getreftypes.php`,
                object
            ).then(result => result.data)
                .then(data => {
                    dispatch(fetchData(pagename, object))
                    return data
                })
        })

    }
}


export function saveAttributes(object, objectForPage, pagename) {
    return dispatch => {
        dispatch({
            type: 'SAVE_ATTR',
            payload: axios.post(`${API_MODS}/put.php`,
                object
            ).then(result => result.data)
                .then(data => data.Body.ResponseStatus === '0' ? dispatch(getModPage(objectForPage, pagename)) : alert('sehv'))

        })

    }
}

export function getRefTypes(object) {
    return dispatch => {
        dispatch({
            type: 'FETCH_REFTYPES',
            payload: axios.post(`${API_MODS}/getreftypes.php`,
                object
            ).then(result => result.data)
                .then(data => data)
        })

    }
}



export function getRefLists(object) {
    return dispatch => {
        dispatch({
            type: 'FETCH_REFLISTS',
            payload: axios.post(`${API_MODS}/getreflist.php`,
                object
            ).then(result => result.data)
                .then(data => data)
        })

    }
}

export function updateLoading() {
    return {
        type: 'SAVE',
        payload: {
            loading: true,

        }
    }
}


export function updateTypeLoading() {
    return {
        type: 'SAVETYPE',
        payload: {
            loading: true,

        }
    }
}

export function saveRefLists(object, id) {
    console.log(id)
    return dispatch => {
        dispatch({
            type: 'SAVE_REFLIST',
            payload: axios.post(`${API_MODS}/putrefitem.php`,
                object
            ).then(result => result.data)
                .then(data => data.Body.ResponseStatus === '0' ? dispatch(getRefLists({ token: JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).Token : '', refid: id })) : alert('sehv'))
        })

    }
}


export function saveRefTypes(object) {
    return dispatch => {
        dispatch({
            type: 'SAVE_REFTYPES',
            payload: axios.post(`${API_MODS}/putcustomref.php`,
                object
            ).then(result => result.data)
                .then(data => data.Body.ResponseStatus === '0' ? dispatch(getRefTypes({ token: JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).Token : '' })) : alert('sehv'))
        })

    }
}

export function deleteRefTypes(object, id) {
    return dispatch => {
        dispatch({
            type: 'DELETE_REFTYPES',
            payload: axios.post(`${API_MODS}/delreference.php?id=` + id,
                object
            ).then(result => result.data)
                .then(data => data.Body.ResponseStatus === '0' ? dispatch(getRefTypes({ token: JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).Token : '' })) : alert('sehv'))
        })

    }
}


export function deleteRefLists(object, id, ref) {
    return dispatch => {
        dispatch({
            type: 'DELETE_REFLIST',
            payload: axios.post(`${API_MODS}/delrefitem.php?id=` + id,
                object
            ).then(result => result.data)
                .then(data => data.Body.ResponseStatus === '0' ? dispatch(getRefLists({ token: JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).Token : '', refid: ref })) : alert('sehv'))
        })

    }
}


export function deleteAttributes(object, id) {
    return dispatch => {
        dispatch({
            type: 'DELETE_ATTR',
            payload: axios.post(`${API_MODS}/del.php?id=` + id,
                object
            ).then(result => result.data)
                .then(data => data.Body.ResponseStatus === '0' ? dispatch(getModPage(object,'attributes')) : alert('sehv'))
        })

    }
}
