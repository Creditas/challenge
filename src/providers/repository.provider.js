import {call, put} from 'redux-saga/effects';
import axios from 'axios';

import * as commitActions from '../store/commit/actions';
import * as repositoryActions from '../store/repository/actions';

export function* fetchRepositories() {
  const url = '/user/repos';

  try {
    yield put(repositoryActions.listRequested());
    const {data} = yield call(axios.get, url);

    if (data && data.length > 0) {
      yield put(repositoryActions.listFetched(data));
    } else {
      throw 'No repository found';
    }
  } catch (e) {
    yield put(repositoryActions.listFailed(e.message || e));
  }
}

export function* fetchCommits(id) {
  const url = `/repositories/${id}/commits`;

  try {
    const {data} = yield call(axios.get, url);

    if (data && data.length > 0) {
      yield put(commitActions.listFetched(data));
    } else {
      throw 'No commit found';
    }
  } catch (e) {
    yield put(commitActions.listFailed(e.message || e));
  }
}
