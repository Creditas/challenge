import {call, put} from 'redux-saga/effects';
import axios from 'axios';

import {
  loginFailed,
  loginSucceed,
  searchLoginRequested,
  searchLoginSucceed,
} from '../store/auth/actions';

export function* fetchUsername(email) {
  const url = `/search/users?q=${encodeURIComponent(email)}+in:email`;

  try {
    yield put(searchLoginRequested());
    const {data} = yield call(axios.get, url);

    if (data && data.items.length > 0) {
      const username = data.items[0].login;
      yield put(searchLoginSucceed(username));
    } else {
      throw 'User not found';
    }
  } catch (e) {
    console.log(e);
    yield put(loginFailed(e.message || e));
  }
};

export function* fetchLogin(credentials) {
  const url = '/user';
  const config = {
    auth: {username: credentials.username, password: credentials.pass},
  };

  try {
    const {data} = yield call(axios.get, url, config);

    if (data) {
      yield put(loginSucceed(data));
      return true;
    } else {
      throw 'Login failed';
    }
  } catch (e) {
    yield put(loginFailed(e.message || e));
  }
  return false;
};
