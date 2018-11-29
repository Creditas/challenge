export default (state = [], action) => {
	switch (action.type) {
		case 'POST_MESSAGE':
			return action.payload
		case 'CREATE_ROOM':
			return [...state, action.payload]
		case 'CLEAR':
			return []
		default:
			return state
	}
}
