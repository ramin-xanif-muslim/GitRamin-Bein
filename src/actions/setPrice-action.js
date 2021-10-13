

export default function setPrice(price){
	return {
		type: 'UPDATE_PRICE',
		payload: {
			price :price,
		}
	}
}