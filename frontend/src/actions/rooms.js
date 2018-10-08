import { CREATE_NEW_ROOM, SEND_MESSAGE } from '../constants/actionTypes';

export const sendMessage = (roomId, message, messageWrapperRef) => ({
  type: SEND_MESSAGE,
  roomId,
  message,
  messageWrapperRef
});

export const addNewRoom = () => ({ type: CREATE_NEW_ROOM });
