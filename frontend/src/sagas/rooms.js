import { takeLatest, put } from 'redux-saga/effects';
import User from '../interfaces/User';
import Message from '../interfaces/Message';
import Room from '../interfaces/Room';

import {
  GET_ROOM,
  ADD_ROOM,
  LOADING_ROOM,
  ERROR_ADDING_ROOM,
  SEND_MESSAGE,
  ADD_MESSAGE,
  ERROR_ADDING_MESSAGE
} from '../constants/actionTypes';

// Todo replace this User layer for something coming from outside on Redux store
const MockedUSer = new User({
  name: 'Romulo Bordezani',
  role: 'user'
});

const userId = MockedUSer.get().id;

function* addInitialRoom() {
  try {
    yield put({ type: LOADING_ROOM });
    yield put({ type: ADD_ROOM, payload: new Room({}) });
  } catch (error) {
    yield put({ type: ERROR_ADDING_ROOM, error });
  }
}

function* sendMessage(action) {
  try {
    yield put({
      type: ADD_MESSAGE,
      payload: new Message({
        content: action.message,
        userId
      })
    });
  } catch (error) {
    yield put({ type: ERROR_ADDING_MESSAGE, error });
  }
}

export default function* watcherSaga() {
  yield takeLatest(GET_ROOM, addInitialRoom);
  yield takeLatest(SEND_MESSAGE, sendMessage);
}
