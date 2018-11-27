const selectedRoomId = (state = 1, action) => {
    switch (action.type) {
      case 'SELECT_ROOM':
        return action.selectedRoomId
      default:
        return state
    }
  }

  export default selectedRoomId