export const UPDATE_LANGUAGE  = 'UPDATE_LANGUAGE'

export function updateLanguage(language){
	return {
		type: UPDATE_LANGUAGE,
		payload: {
			lang :language
		}
	}
}
