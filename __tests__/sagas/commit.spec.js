import {expectSaga} from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import axios from 'axios';

import * as commitActions from '../../src/store/commit/actions';

import commitSagas from '../../src/store/commit/sagas';

describe('Commit Sagas', () => {
  describe('loadCommits', () => {
    const fakeList = [{}, {}];
    const fakeResponse = {data: fakeList};

    it('should load commits', () => {
      return expectSaga(commitSagas)
        .provide([[matchers.call.fn(axios.get), fakeResponse]])
        .put(commitActions.listFetched(fakeList))
        .dispatch(commitActions.listRequested(22))
        .silentRun(50);
    });

    it('should not load commits', () => {
      return expectSaga(commitSagas)
        .provide([[matchers.call.fn(axios.get), {}]])
        .put(commitActions.listFailed('No commit found'))
        .dispatch(commitActions.listRequested(22))
        .silentRun(50);
    });
  });
});
