import { takeLatest, put } from 'redux-saga/effects';

import { ADD_ROOM, ADDED_ROOM, LOADING_ROOM, ERROR_ADDING_ROOM } from '../constants/actionTypes';

function* addRoom(action) {
  try {
    yield put({ type: LOADING_ROOM });
    yield put({ type: ADD_ROOM, payload: { aRoom: action.payload } });
    yield put({ type: ADDED_ROOM });
  } catch (error) {
    yield put({ type: ERROR_ADDING_ROOM, error });
  }
}

export default function* watcherSaga() {
  yield takeLatest(ADD_ROOM, addRoom);
}
