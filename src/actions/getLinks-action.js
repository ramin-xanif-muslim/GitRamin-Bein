import { API_BASE } from '../config/env';
import axios from 'axios';
import filterLinks from '../config/filterLinks';
import { getToken } from '../config/token';

export const FETCH_LINKS = 'FETCH_LINKS'


export default function getLinks(docid,doctype) {
    filterLinks.doctype = doctype
    filterLinks.id = docid
    filterLinks.token = JSON.parse(localStorage.getItem('user')) ? JSON.parse(localStorage.getItem('user')).Token : ''
    return dispatch => {
        dispatch({
            type: FETCH_LINKS,
            payload: axios.post(`${API_BASE}/links/get.php`,
            filterLinks
            ).then(result => result.data)
                .then(data => data)
        })
    }
}