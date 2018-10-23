const messages = (state = [], action) => {
  switch (action.type) {
    case 'ADD_MESSAGE':
    case 'MESSAGE_RECEIVED':
      return state.concat([
        {
          message: action.message,
          author: action.author,
          id: action.id,
          room_id: action.room_id
        }
      ])
    default:
      return state
  }
}

export default messages
