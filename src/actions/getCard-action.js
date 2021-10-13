import { API_BASE } from '../config/env';
import axios from 'axios';
import filterBarcode from '../config/filterBarcode'
import { getToken } from '../config/token';

export const FETCH_CARD = 'FETCH_CARD'


export default function getCard() {
    filterBarcode.token = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).Token : ''

    return dispatch => {
        filterBarcode.w = 2;

        dispatch({
            type: 'FETCH_CARD',
            payload: axios.post(`${API_BASE}/barcode/get.php`,
                filterBarcode
            ).then(result => result.data)
                .then(data => data)
        })
    }
}