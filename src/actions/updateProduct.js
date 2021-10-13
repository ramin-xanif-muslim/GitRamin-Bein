
export function updateProduct(option,bool){
	return {
		type: 'UPDATE_PRODUCT',
		payload: {
			product :option,
			checkBarcode :bool,
		}
	}
}


export function updatePositions(bool,positions){
	console.log(positions)
	return {
		type: 'UPDATE_POSITIONS',
		payload: {
			checkClickInput : bool,
			positions:positions
		}
	}
}


export function updateBarcode(){
	return {
		type: 'UPDATE_POSITIONS_BARCODE',
		payload: {
			barcode: true,

		}
	}
}






export function deleteProduct(option){
	return {
		type: 'DELETE_PRODUCT',
		payload: {
			product : ''
		}
	}
}
