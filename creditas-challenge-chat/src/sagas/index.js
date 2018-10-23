import { takeEvery, all } from 'redux-saga/effects'
import * as types from '../constants/ActionTypes'

const watchAll = function* watchAll(params) {
  yield all([
    takeEvery(types.ADD_MESSAGE, (action) => {
      action.author = params.username
      params.socket.send(JSON.stringify(action))
    }),
    takeEvery(types.ADD_ROOM, (action) => {
      action.name = params.name
      params.socket.send(JSON.stringify(action))
    })
  ]);
}

export default watchAll
