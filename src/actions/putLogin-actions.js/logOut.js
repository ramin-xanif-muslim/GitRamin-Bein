

export  function logOut(){
	return {
		type: 'DELETE_LOGIN',
		payload: {
			logout :localStorage.removeItem('user')

		}
	}
}



export  function ClearNav(){
	return {
		type: 'CLEAR_NAV',
	}
}

