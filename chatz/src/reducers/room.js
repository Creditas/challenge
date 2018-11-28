const initialState = []

export default (state = initialState, action = {}) => {
	switch (action.type) {
		case 'POST_MESSAGE':
			return action.payload
		case 'CREATE_ROOM':
			return [...state, action.payload]
		case 'CLEAR':
			return initialState
		default:
			return state
	}
}
