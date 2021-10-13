import { API_BASE } from '../config/env';
import axios from 'axios';

export function fetchPrices() {
    return dispatch => {
        dispatch({
            type: 'FETCH_PRICES',
            payload: axios.post(`${API_BASE}/pricetypes/get.php`,
                { token: JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).Token : '' }
            ).then(result => result.data)
                .then(data => {

                    return data
                })
        })

    }
}




