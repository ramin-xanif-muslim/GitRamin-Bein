import {
    FETCH_DOC_NAME_PENDING,
    FETCH_DOC_NAME_FULFILLED,
    FETCH_DOC_NAME_REJECTED

} from '../config/fetching';



const initialState = {
    docName: undefined,
    newDocId: '',
    iscreated: false,
    createDoc: {}
}

function savedoc(state = initialState, action) {
    switch (action.type) {
        case 'UPDATE_DOC_NAME':
            return {
                ...state,
                docName: action.payload.newDocName,
            }
        case 'UPDATE_DOC_ID':
            return {
                ...state,
                newDocId: action.payload.newDocId,
            }

        case 'ISCREATED':
            return {
                ...state,
                iscreated: action.payload.newdoc,
            }
        case 'CLEAR_DOC':
            return {
                ...state,
                createDoc: action.payload.cleared,
            }


        case 'FETCH_DOC_AFTER_SAVE_FULFILLED':
            return {
                ...state,
                createDoc: action.payload.Body.List[0],
            }



        default:
            return state;
    }
}


export default savedoc
