import { ADD_ROOM, LOADING_ROOM, ADD_MESSAGE } from '../constants/actionTypes';

const initialState = {
  list: [],
  errors: [],
  loading: true
};

/* eslint-disable */
function insertItem(array, action) {
  return [
    ...array.slice(0, action.index),
    action.item,
    ...array.slice(action.index)
  ]
}

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
      const updatedRoomList = state.list;
      updatedRoomList.push(action.payload);
      return {
        ...state,
        list: updatedRoomList,
        loading: false
      };
    }

    case ADD_MESSAGE: {
      const updatedMessageList = state.list.slice(0);
      updatedMessageList[0].messages.push(action.payload); // Todo find the right Room instead of 0
      console.log(updatedMessageList[0].messages, action.payload);
      return {
        ...state,
        list: updatedMessageList
      };
    }

    default: {
      return state;
    }
  }
};

export default room;
