import * as types from "../constants/ActionTypes";
import { messageReceived, populateUsersList, updateRooms } from "../actions";

const setupSocket = (dispatch, username) => {
  const socket = new WebSocket("ws://localhost:8989");

  socket.onopen = () => {
    socket.send(
      JSON.stringify(
        {
          type: types.ADD_USER,
          name: username
        }
      )
    );
  };
  socket.onmessage = event => {
    const data = JSON.parse(event.data);
    console.log('data', data);
    switch (data.type) {
      case types.ADD_MESSAGE:
        dispatch(messageReceived(data.message, data.author, data.room_id));
        break;
      case types.USERS_LIST:
        dispatch(populateUsersList(data.users));
        break;
      case types.ADD_ROOM:
        dispatch(updateRooms(data.name));
        break;
      default:
        break;
    }
  };

  return socket;
};

export default setupSocket;
