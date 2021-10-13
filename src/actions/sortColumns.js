export function sortColumns(colName){
	return {
		type: 'UPDATE_SORTCOL',
		payload: {
			colName :colName,
		}
	}
}

