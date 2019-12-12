import {expectSaga} from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import axios from 'axios';

import authSagas from '../../src/store/auth/sagas';
import {
  loginFailed,
  loginRequested,
  loginSucceed,
  searchLoginRequested,
  searchLoginSucceed,
  setEmail,
} from '../../src/store/auth/actions';

describe('Auth Sagas', () => {
  describe('searchUsername', () => {
    const fakeUsername = 'test';
    const fakeEmail = 'test@test.com';
    const fakeResponse = {data: {items: [{login: fakeUsername}]}};

    it('should find username', () => {
      return expectSaga(authSagas)
        .provide([[matchers.call.fn(axios.get), fakeResponse]])
        .put(searchLoginRequested())
        .put(searchLoginSucceed(fakeUsername))
        .dispatch(setEmail(fakeEmail))
        .silentRun(50);
    });

    it('should not find username', () => {
      return expectSaga(authSagas)
        .provide([[matchers.call.fn(axios.get), {}]])
        .put(searchLoginRequested())
        .put(loginFailed('User not found'))
        .dispatch(setEmail(fakeEmail))
        .silentRun(50);
    });
  });

  describe('loginUser', () => {
    const fakeUser = {name: 'test'};
    const fakeCredentials = {username: 'test@test.com', pass: 'test'};
    const fakeResponse = {data: fakeUser};

    it('should login user', () => {
      return expectSaga(authSagas)
        .provide([[matchers.call.fn(axios.get), fakeResponse]])
        .put(loginSucceed(fakeUser))
        .dispatch(loginRequested(fakeCredentials))
        .silentRun(50);
    });

    it('should not login user', () => {
      return expectSaga(authSagas)
        .provide([[matchers.call.fn(axios.get), {}]])
        .put(loginFailed('Login failed'))
        .dispatch(loginRequested(fakeCredentials))
        .silentRun(50);
    });
  });
});
