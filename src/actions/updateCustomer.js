
export function updateCustomer(option){
	return {
		type: 'UPDATE_CUSTOMER',
		payload: {
			customer :option,
		}
	}
}




export function deleteCustomer(){
	return {
		type: 'DELETE_CUSTOMER',
		payload: {
			customer : ''
		}
	}
}
