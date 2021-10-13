
export function putAddedPoisitons(option){
	return {
		type: 'UPDATE_POSITIONS',
		payload: {
			positions :option
		}
	}
}

