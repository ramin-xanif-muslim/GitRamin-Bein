import { API_BASE } from '../../config/env';
import { getToken } from '../../config/token';
import { getGroups } from '../getGroups-action';
import {
    message
} from 'antd';

import axios from 'axios';


export function setRedirect(bool) {
    return {
        type: 'DEL_REDIRECT',
        payload: {
            redirectDelete: bool,
        }

    }
}

export function isDeleted(bool) {
    return {
        type: 'ISDELETED',
        payload: {
            isdeleted: bool
        }

    }
}

export function delData(controllerName, dataObject, id) {
    return dispatch => {
        dataObject.token = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).Token : ''
        dispatch({
            type: 'DEL_DATA',
            payload: axios.post(`${API_BASE}/` + controllerName + `/del.php?id=${id}`,
                dataObject
            ).then(result => result.data)
                .then(data => {
                    data.Body.ResponseStatus === '0' ?

                        dispatch(setRedirect(true))
                        :
                        dispatch(setRedirect(false))

                        data.Body.ResponseStatus === '0' ? dispatch(isDeleted(true)) : dispatch(isDeleted(false))
                    
                    progressDelete(false, data.Body.ResponseStatus, data.Body)
                })
        })
    }
}





export const progressDelete = (fetching, status, mess) => {
    if (fetching) {
        message.loading('Yüklənir...')
    }
    else if (fetching === 'error') {
        console.log('errora girdi')
        message.destroy()
        message.error(`Silinmədi.. ${mess}`)

    }
    else {

        message.destroy()
        if (status === '0') {
            message.success('Silindi')

        }
        else {
            message.error(`Silinmədi.. ${mess}`)
        }
    }
};
