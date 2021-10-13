export const UPDATE_CHANGED = 'UPDATE_CHANGED'

export default function updateChanged(boolType,from){
	return {
		type: UPDATE_CHANGED,
		payload: {
			changed :boolType,
            redirect:from
		}
	}
}
