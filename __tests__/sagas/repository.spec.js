import {expectSaga} from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import axios from 'axios';

import * as repoActions from '../../src/store/repository/actions';

import repositorySagas from '../../src/store/repository/sagas';
import {loginSucceed} from '../../src/store/auth/actions';

describe('Repository Sagas', () => {
  describe('loadRepositories', () => {
    const fakeList = [{}, {}];
    const fakeResponse = {data: fakeList};

    it('should load repositories', () => {
      return expectSaga(repositorySagas)
        .provide([[matchers.call.fn(axios.get), fakeResponse]])
        .put(repoActions.listRequested())
        .put(repoActions.listFetched(fakeList))
        .dispatch(loginSucceed({}))
        .silentRun(50);
    });

    it('should not find repositories', () => {
      return expectSaga(repositorySagas)
        .provide([[matchers.call.fn(axios.get), {}]])
        .put(repoActions.listRequested())
        .put(repoActions.listFailed('No repository found'))
        .dispatch(loginSucceed({}))
        .silentRun(50);
    });
  });

  describe('searchRepositories', () => {
    const fakeTerm = 'Lor';
    const fakeList = [{name: 'Lorem', full_name: ''}, {name: 'Ipsum', full_name: ''}];
    const mockState = {
      repository: {
        list: fakeList,
        term: fakeTerm,
      },
    };

    it('should filter one repository', () => {
      return expectSaga(repositorySagas)
        .withState(mockState)
        .put(repoActions.listRequested())
        .put(repoActions.setFilteredList([fakeList[0]]))
        .dispatch(repoActions.searchInputChanged(fakeTerm))
        .silentRun(350);
    });
  });
});
