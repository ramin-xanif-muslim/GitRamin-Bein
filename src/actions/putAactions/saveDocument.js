import { API_BASE } from '../../config/env';
import { getToken } from '../../config/token';
import { getGroups } from '../getGroups-action';
import Sound from 'react-sound';
import { changeForm } from '../updateStates-action';
import axios from 'axios';
import { Message } from 'semantic-ui-react'
import ok from '../../audio/ok.mp3'
import moment from 'moment';
import { fetchPage } from '../getData-action'
import { getCustomersData } from '../getCustomerGroups-action';
import {
    message
} from 'antd';

import {
    CloseCircleOutlined
} from '@ant-design/icons';



export function updateSelectedCustomer(id, name) {
    return {
        type: 'UPDATE_CUSTOMER_NAME',
        payload: {
            selectCustomerId: id,
            selectCustomerName: name,
        }
    }

}



export function updateDocName(value) {
    return {
        type: 'UPDATE_DOC_NAME',
        payload: {
            newDocName: value
        }
    }

}

export function isCreated(bool) {
    return {
        type: 'ISCREATED',
        payload: {
            newdoc: bool
        }
    }
}


export function createNewDocId(id) {
    return {
        type: 'UPDATE_DOC_ID',
        payload: {
            newDocId: id
        }
    }
}



export function clearDoc() {
    return {
        type: 'CLEAR_DOC',
        payload: {
            cleared: {}
        }
    }
}

export function getDocAfterSave(controllerName, id) {
    var getDoc = {}
    getDoc.token = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).Token : ''
    getDoc.id = id
    return dispatch => {
        dispatch({
            type: 'FETCH_DOC_AFTER_SAVE',
            payload: axios.post(`${API_BASE}/` + controllerName + `/get.php`,
                getDoc
            ).then(result => result.data)
                .then(data => data)
        })
    }
}

export function putDoc(controllerName, dataObject) {
    return dispatch => {
        dispatch({
            type: 'PUT_DOCUMENT',
            payload: axios.post(`${API_BASE}/` + controllerName + `/put.php`,
                dataObject
            ).then(result => result.data)
                .then(data => {
                    dispatch(data.Body.ResponseStatus === '0' ? createNewDocId(data.Body.ResponseService) : createNewDocId(''))
                    dispatch(isCreated(data.Body.ResponseStatus === '0' ? true : false))
                    dispatch(changeForm(data.Body.ResponseStatus === '0' ? false : true))
                    progress(false, data.Body.ResponseStatus, data.Body)
                    dispatch(getCustomersData(dataObject.customerid))
                    dispatch(getDocAfterSave(controllerName, data.Body.ResponseService))

                })
        })
    }
}


export function saveDocument(controllerName, dataObject) {
    if (!dataObject.moment) {
        dataObject.moment = moment().format('YYYY-MM-DD HH:mm:ss')
        dataObject.modify = moment().format('YYYY-MM-DD HH:mm:ss')

    }
    else {
        dataObject.moment = moment(dataObject.moment).format('YYYY-MM-DD HH:mm:ss')

    }

    if (dataObject.name === '' && dataObject.id === '') {
        return dispatch => {
            dispatch({
                type: 'PUT_DOCUMENT',
                payload: axios.post(`${API_BASE}/` + controllerName + `/newname.php`, {
                    token: dataObject.token, n: ''
                }
                ).then(result => result.data)
                    .then(data => {
                        dispatch(updateDocName(data.Body.ResponseService))
                        dataObject.name = data.Body.ResponseService
                        dispatch(putDoc(controllerName, dataObject))

                    })
            })
        }
    }
    else {
        return dispatch => {
            dispatch({
                type: 'PUT_DOCUMENT',
                payload: dispatch(putDoc(controllerName, dataObject))

            })
        }
    }

}


const onClose = () => {
    message.destroy()

}
const key = 'warning'
export const progress = (fetching, status, mess) => {
    if (fetching) {
        message.loading('Yüklənir...')
    }
    else if (fetching === 'error') {
        console.log('errora girdi')
        message.destroy()
        message.error({ content: <span className='error_mess_wrap'>Saxlanılmadı... {mess}  {<CloseCircleOutlined onClick={onClose} />}</span>, key, duration: 0, onClose })


    }
    else {

        message.destroy()
        if (status === '0') {
            message.success('Saxlanıldı')

        }
        else {
            message.error({ content: <span className='error_mess_wrap'>Saxlanılmadı... {mess}  {<CloseCircleOutlined onClick={onClose} />}</span>, key, duration: 0, onClose })
        }
    }
};

