


import { API_BASE } from '../../config/env';
import { getToken } from '../../config/token';
import axios from 'axios';
import { updateSelectProductMultiConfirm } from '../updateStates-action';
import {
    message
} from 'antd';
export function putLocalStates(values, newproduct,id) {
    return {
        type: 'UPDATE_LOCAL_STATES',
        payload: {
            formvalues: values,
            newProduct: newproduct,
            newid:id
        }
    }
}

export function newProductGroup(newGroup, newGroupId) {
    return {
        type: 'UPDATE_NEW_GROUP',
        payload: {
            newGroup: newGroup,
            newGroupId: newGroupId,
        }
    }
}
export function putDataCustomer(dataObject) {
    return dispatch => {
        dataObject.token = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).Token : ''
        dispatch({
            type: 'PUT_DATA_CUSTOMER',
            payload: axios.post(`${API_BASE}/customers/put.php`,
                dataObject
            ).then(result => result.data)
                .then(data => data)
        })
    }
}


export function putDataProduct(dataObject) {
    return dispatch => {
        dispatch({
            type: 'PUT_DATA_PRODUCT',
            payload: axios.post(`${API_BASE}/products/put.php`,
                dataObject
            ).then(result => result.data)
                .then(data => {
                    if (data.Body.ResponseStatus === '0') {
                        dispatch(putLocalStates(dataObject, data.Body.ResponseService,data.Body.ResponseService))
                        progress(false, data.Body.ResponseStatus, data.Body)
                        dispatch(updateSelectProductMultiConfirm(false, true))


                    }
                    return data
                })
        })
    }
}
export const progress = (fetching, status, mess) => {
    if (fetching) {
        message.loading('Yüklənir...')
    }
    else if (fetching === 'error') {
        console.log('errora girdi')
        message.destroy()
        message.error(`Saxlanılmadı.. ${mess}`)

    }
    else {

        message.destroy()
        if (status === '0') {
            message.success('Saxlanıldı')

        }
        else {
            message.error(`Saxlanılmadı.. ${mess}`)
        }
    }
};


export function putDataStock(dataObject) {
    return dispatch => {
        dataObject.token = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).Token : ''
        dispatch({
            type: 'PUT_DATA_STOCK',
            payload: axios.post(`${API_BASE}/stocks/put.php`,
                dataObject
            ).then(result => result.data)
                .then(data => data)
        })
    }
}


export function putDataFromStock(dataObject) {
    return dispatch => {
        dataObject.token = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).Token : ''
        dispatch({
            type: 'PUT_DATA_FROMSTOCK',
            payload: axios.post(`${API_BASE}/stocks/put.php`,
                dataObject
            ).then(result => result.data)
                .then(data => data)
        })
    }
}

