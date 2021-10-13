export function updateColName(cols) {
	return {
		type: 'UPDATE_COLNAME',
		payload: {
			newcols: cols,
		}
	}
}




export function updateColNameChecked(cols) {
	return {
		type: 'UPDATE_COLNAMECHECKED',
		payload: {
			newcolschecked : cols
		}
	}
}





