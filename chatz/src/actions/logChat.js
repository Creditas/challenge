
const rooms = []

export default {
	createRoom(id) {
		return {
			type: 'CREATE_ROOM',
			payload: {
				messages: [],
				id
			}
		}
	},

	message(message, username, sender, id) {
		const msg = {
			sender,
			message,
			username
		}

		const findRoom = rooms.find(e => e.id == id)
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
