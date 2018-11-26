import store from '@/store'

export default {
	message(message, hash, sender) {
		const messages = store.getState().chatlog.messages || []
		const username = store.getState().username
		const history = messages
		history.push({
			sender,
			message,
			username
		})

		return {
			type: 'POST_MESSAGE',
			payload: {
				roomID: hash,
				messages: history
			}
		}
	}
}
