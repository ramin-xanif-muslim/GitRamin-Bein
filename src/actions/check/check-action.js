export  function getCheckPage(bool){
	return {
		type: 'CHECK_PAGE',
		payload: {
            show : bool
		}
	}
}