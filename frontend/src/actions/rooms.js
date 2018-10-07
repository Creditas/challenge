import { GET_ROOM, SEND_MESSAGE } from '../constants/actionTypes';

export const getRoom = room => ({ type: GET_ROOM, room });
export const sendMessage = (room, message) => ({ type: SEND_MESSAGE, room, message });
