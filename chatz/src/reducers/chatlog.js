const initialState = {
	chat: {
		roomID: '',
		messages: []
	}
}

export default (state = initialState, action) => {
	switch (action.type) {
		case 'POST_MESSAGE':
			return action.payload
		case 'CLEAR':
			return initialState
		default:
			return state
	}
}
