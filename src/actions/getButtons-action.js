export const UPDATE_BUTTON  = 'UPDATE_BUTTON'

export function updateButton(from){
	return {
		type: UPDATE_BUTTON,
		payload: {
			page :from
		}
	}
}
