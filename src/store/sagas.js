import {all} from 'redux-saga/effects';

import auth from './auth/sagas';
import repository from './repository/sagas';
import commit from './commit/sagas';

export default function* rootSaga() {
  yield all([
    auth(),
    repository(),
    commit(),
  ]);
}
