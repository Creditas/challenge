import {all, call, takeEvery} from 'redux-saga/effects';
import * as types from './actionTypes';
import {fetchCommits} from '../../providers/repository.provider';

function* loadCommits({id}) {
  yield call(fetchCommits, id);
}

// WATCHERS
function* watchRepoName() {
  yield takeEvery(types.LIST_REQUESTED, loadCommits);
}

export default function* root() {
  yield all([
    watchRepoName(),
  ]);
}
