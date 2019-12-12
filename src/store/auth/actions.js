import * as types from './actionTypes';

export const loginRequested = credentials => ({
  type: types.LOGIN_REQUESTED,
  credentials,
});

export const loginSucceed = user => ({
  type: types.LOGIN_SUCCEED,
  user,
});

export const loginFailed = error => ({
  type: types.LOGIN_FAILED,
  error,
});

export const searchLoginRequested = () => ({
  type: types.SEARCH_LOGIN_REQUESTED,
});

export const searchLoginSucceed = username => ({
  type: types.SEARCH_LOGIN_SUCCEED,
  username,
});

export const setEmail = email => ({
  type: types.SET_EMAIL,
  email,
});
