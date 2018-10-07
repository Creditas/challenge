import { ADD_ROOM, LOADING_ROOM, ADD_MESSAGE } from '../constants/actionTypes';

const initialState = {
  list: [],
  errors: [],
  loading: true
};

const room = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_ROOM: {
      return {
        ...state,
        loading: true,
        errors: []
      };
    }

    case ADD_ROOM: {
      const updatedRoomList = state.list.slice(0);
      updatedRoomList.push(action.payload);
      return {
        ...state,
        list: updatedRoomList,
        loading: false
      };
    }

    case ADD_MESSAGE: {
      const roomToAddMessage = state.list.findIndex(roomItem => {
        return roomItem.id === action.payload.roomId;
      });

      const roomListCloned = state.list.slice(0);
      roomListCloned[roomToAddMessage].messages.push(action.payload.message);

      return {
        ...state,
        list: roomListCloned
      };
    }

    default: {
      return state;
    }
  }
};

export default room;
