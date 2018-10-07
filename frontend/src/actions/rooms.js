import { GET_ROOM, SEND_MESSAGE } from '../constants/actionTypes';

export const getRoom = room => ({ type: GET_ROOM, room });
export const sendMessage = (roomId, message) => ({ type: SEND_MESSAGE, roomId, message });
export const addNewRoom = () => ({ type: GET_ROOM });
