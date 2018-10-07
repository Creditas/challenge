import { CREATE_NEW_ROOM, SEND_MESSAGE } from '../constants/actionTypes';

export const sendMessage = (roomId, message) => ({ type: SEND_MESSAGE, roomId, message });
export const addNewRoom = () => ({ type: CREATE_NEW_ROOM });
