import { encode } from 'base-64';

import { gitService } from '../../Services';

export const Types = {
  REPOSITORY_REQUEST: 'Repository/Request',
  REPOSITORY_REQUEST_SUCCESS: 'Repository/Request/Success',
  REPOSITORY_REQUEST_FAILED: 'Repository/Request/Failed',
};

export const getRepos = () => (dispatch, getState) => {
  const { user } = getState();
  const url = (user.user || {}).repos_url;
  const credential = (user.user || {}).credential;

  return gitService.fetchDynamic({ url, credential })
    .then(payload => dispatch({ type: Types.REPOSITORY_REQUEST_SUCCESS, payload }))
    .catch(error => dispatch({ type: Types.REPOSITORY_REQUEST_FAILED, payload: error.message }));
}

export const getCommits = repo => (dispatch, getState) => {
  const { user } = getState();
  const url = repo.commits_url;
  const credential = (user.user || {}).credential;

  return gitService.fetchDynamic({ url, credential })
    .then(payload => dispatch({ type: Types.REPOSITORY_REQUEST_SUCCESS, payload }))
    .catch(error => dispatch({ type: Types.REPOSITORY_REQUEST_FAILED, payload: error.message }));
}

const INITIAL_STATE = {
  error: '',
  loading: false,
  repos: [],
};

export function reducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case Types.REPOSITORY_REQUEST:
      return {
        ...state,
        loading: true,
        error: INITIAL_STATE.error,
      };
    case Types.REPOSITORY_REQUEST_SUCCESS:
      return {
        ...state,
        repos: payload,
        error: INITIAL_STATE.error,
        loading: false,
      };
    case Types.REPOSITORY_REQUEST_FAILED:
      return {
        ...state,
        error: payload,
        loading: false,
      }
    default:
      return state;
  }
}
