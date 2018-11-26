export default (state = '', action) => {
	switch (action.type) {
		case 'SET_USERNAME':
			return action.payload
		default:
			return state
	}
}
