import {takeEvery, call, all} from 'redux-saga/effects';
import axios from 'axios';

import * as types from './actionTypes';
import {fetchLogin, fetchUsername} from '../../providers/auth.provider';

function* loginUser({credentials}) {
  const success = yield call(fetchLogin, credentials);
  if (success) {
    axios.defaults.auth = {
      username: credentials.username,
      password: credentials.pass,
    };
  }
}

function* searchUsername({email}) {
  if (email) {
    yield call(fetchUsername, email);
  }
}

// WATCHERS
function* watchLogin() {
  yield takeEvery(types.LOGIN_REQUESTED, loginUser);
}

function* watchEmail() {
  yield takeEvery(types.SET_EMAIL, searchUsername);
}

export default function* root() {
  yield all([watchLogin(), watchEmail()]);
}
