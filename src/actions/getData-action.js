import { API_BASE } from '../config/env';
import axios from 'axios';
import filterObject from '../config/filterObject'
import { getToken } from '../config/token';
import { getCustomersData } from './getCustomerGroups-action';
import { fetchProfile } from './getProfile-action';
import { getCustomers } from './getCustomerGroups-action';
import getMarks from './getMarks-action';
import store from '../index'
export const UPDATE_CHANGEPAGE = 'UPDATE_CHANGEPAGE'



export const loadingData = (bool) => ({
    type: 'FETCH_FINAL_DATA',
    payload: bool,
})

export const fetchData = (controllerName, object) => {
    return (dispatch) => {
        const response =
            dispatch({
                type: 'FETCH_MARK',
                payload: axios.post(`${API_BASE}/marks/get.php`,
                    { token: JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).Token : '' }
                ).then(result => result.data)
                    .then(data => {
                        if (data.Headers.ResponseStatus === '0') {
                            return data
                        }
                    })
            })
        response.then((data) => {
            dispatch({
                type: 'FETCH_DATA',
                payload: axios.post(`${API_BASE}/` + controllerName + `/get.php`,
                    object
                ).then(result => result.data)
                    .then(data => {
                        if (data.Headers.ResponseStatus === '0') {
                            return data
                        }

                    })
            })
        })
    }
}




export function getTaxes() {
    filterObject.token = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).Token : ''
    return dispatch => {
        dispatch({
            type: 'FETCH_TAXES',
            payload: axios.post(`${API_BASE}/taxes/get.php`, filterObject
            ).then(result => result.data)
                .then(data => data)
        })

    }
}



export function updateCheck(newcheckdata) {
    return {
        type: 'UPDATE_CHECK',
        payload: {
            checkdata: newcheckdata
        }
    }

}

export function removeProfit() {
    return {
        type: 'REMOVE_PROFIT',
        payload: {
            profit: []
        }
    }

}



export function updateSearchInput(value) {
    return {
        type: 'UPDATE_SEARCH',
        payload: {
            searchValue: value
        }
    }

}


export function fetchCheck(controllerName, object) {
    filterObject.token = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).Token : ''
    return dispatch => {
        dispatch({
            type: 'FETCH_CHECK',
            payload: axios.post(`${API_BASE}/` + controllerName + `/get.php`,
                object
            ).then(result => result.data)
                .then(data => dispatch(updateCheck(data.Body.List))).then(s => {
                    dispatch(getCustomersData(s.payload.checkdata[0].CustomerId))
                    dispatch(getCustomers(s.payload.checkdata[0].CustomerId))
                })
        })

    }
}
export function fetchProfit(controllername, object) {
    filterObject.token = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).Token : ''
    return dispatch => {
        dispatch({
            type: 'FETCH_PROFIT',
            payload: axios.post(`${API_BASE}/` + controllername + `/get.php`,
                object ? object : filterObject
            ).then(result => result.data)
                .then(data => data)
        })

    }
}

export function fetchDocuments(object) {
    filterObject.token = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).Token : ''
    return dispatch => {
        dispatch({
            type: 'FETCH_DOCUMENT',
            payload: axios.post(`${API_BASE}/documents/get.php`,
                object
            ).then(result => result.data)
                .then(data => data)
        })

    }
}
export function fetchSecondaryData(controllerName) {
    filterObject.token = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).Token : ''
    return dispatch => {
        dispatch({
            type: 'FETCH_SECONDARYDATA',
            payload: axios.post(`${API_BASE}/` + controllerName + `/get.php`,
                filterObject
            ).then(result => result.data)
                .then(data => data)
        })

    }
}

export function fetchDataFast(controllerName) {
    filterObject.token = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).Token : ''

    return dispatch => {


        dispatch({
            type: 'FETCH_DATAFAST',
            payload: axios.post(`${API_BASE}/` + controllerName + `/getfast.php`,
                filterObject
            ).then(result => result.data)
                .then(data => data)
        })

    }
}



export function fetchPage(controllerName, id) {
    filterObject.token = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).Token : ''
    if (id) {
        delete filterObject['id'];
        filterObject.id = id
    }
    return dispatch => {

        dispatch({
            type: 'FETCH_PAGE',
            payload: axios.post(`${API_BASE}/` + controllerName + `/get.php`,
                filterObject
            ).then(result => result.data)
                .then(data => data)
        })
    }
}



export function updateChangePage(bool) {
    return {
        type: UPDATE_CHANGEPAGE,
        payload: {
            changePage: bool
        }
    }
}

