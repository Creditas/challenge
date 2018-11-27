const initialRoom = [
  { name: 'Rebel Alliance', id: 1 },
  { name: 'Galactic Empire', id: 2 }
];

const rooms = (state = initialRoom, action) => {
    switch (action.type) {
      case 'ADD_ROOM':
      case 'UPDATE_ROOMS':
        return state.concat([
          {
            name: action.name,
            id: action.id
          }
        ])
      default:
        return state
    }
  }

  

  export default rooms