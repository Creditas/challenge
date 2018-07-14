import { takeEvery, put, call } from 'redux-saga/effects'
import { ADD_MESSAGE, send, startSending, doneSending, onFail, finishSending } from '../modules/messages'
import SendLocal from '../service/local';

function* newMessageSage() {
  yield put(startSending());

  try {
    const payload = yield call(SendLocal)
    yield put(send(payload))
  } catch (e){
    yield put(onFail())
  } finally {
    yield put(doneSending())
  }
}

const handleMessages = function* handleMessage() {
  yield takeEvery(ADD_MESSAGE, newMessageSage)
}

export default handleMessages
