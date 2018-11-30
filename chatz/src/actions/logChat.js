
import store from '@/store'

export default {
	createRoom(id) {
		return {
			type: 'CREATE_ROOM',
			payload: {
				id,
				messages: []
			}
		}
	},

	message(message, username, id) {
		const rooms = store.getState().rooms
		const msg = {
			message,
			username
		}

		const findRoom = rooms.find(e => e.id === id)

		if (findRoom) {
			findRoom.messages.push(msg)
		} else {
			rooms.push({
				id,
				messages: [msg]
			})
		}

		return {
			type: 'POST_MESSAGE',
			payload: rooms
		}
	},

	clear() {
		return {
			type: 'CLEAR'
		}
	}
}
