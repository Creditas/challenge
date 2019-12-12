import {takeEvery, takeLatest, call, all, delay, put, select} from 'redux-saga/effects';

import * as selectors from './selectors';
import * as actions from './actions';
import * as types from './actionTypes';
import * as authTypes from '../auth/actionTypes';
import {fetchRepositories} from '../../providers/repository.provider';

function* loadRepositories() {
  yield call(fetchRepositories);
}

function* searchRepositories() {
  yield delay(300);
  yield put(actions.listRequested());
  const filteredList = yield select(selectors.getFilteredRepos);
  yield put(actions.setFilteredList(filteredList));
}

// WATCHERS
function* watchUser() {
  yield takeEvery(authTypes.LOGIN_SUCCEED, loadRepositories);
}

function* watchSearchInput() {
  yield takeLatest(types.SEARCH_INPUT_CHANGED, searchRepositories);
}

export default function* root() {
  yield all([
    watchUser(),
    watchSearchInput(),
  ]);
}
