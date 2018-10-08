// /* eslint-env browser */
import { takeLatest, put } from 'redux-saga/effects';
import User from '../interfaces/User';
import Message from '../interfaces/Message';
import Room from '../interfaces/Room';

import {
  CREATE_NEW_ROOM,
  ADD_ROOM,
  LOADING_ROOM,
  ERROR_ADDING_ROOM,
  SEND_MESSAGE,
  ADD_MESSAGE,
  ERROR_ADDING_MESSAGE
} from '../constants/actionTypes';

// Todo replace this User's layer for something else coming from outside via Redux store
const MockedUSer = new User({
  name: 'Romulo Bordezani',
  role: 'user'
});

const userId = MockedUSer.get().id;

function* addRoom() {
  try {
    setTimeout(() => {
      window.scrollTo(0, document.documentElement.scrollHeight);
    }, 100);
    yield put({ type: LOADING_ROOM });
    yield put({ type: ADD_ROOM, payload: new Room({}) });
  } catch (error) {
    yield put({ type: ERROR_ADDING_ROOM, error });
  }
}

function* sendMessage(action) {
  try {
    /*
      *** envio de mensagens via ajax via long-polling > could be achieved with an ASYNC axios yeld call here ***
    */

    setTimeout(() => {
      /* eslint-disable-next-line */
      action.messageWrapperRef.current.scrollTop = action.messageWrapperRef.current.scrollHeight;
    }, 100); // Timeout needed to wait until the dom have the final height of the new message

    yield put({
      type: ADD_MESSAGE,
      payload: {
        message: new Message({
          content: action.message,
          userId
        }),
        roomId: action.roomId
      }
    });
  } catch (error) {
    yield put({ type: ERROR_ADDING_MESSAGE, error });
  }
}

export default function* watcherSaga() {
  yield takeLatest(CREATE_NEW_ROOM, addRoom);
  yield takeLatest(SEND_MESSAGE, sendMessage);
}
