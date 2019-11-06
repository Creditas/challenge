import { encode } from 'base-64';

import { gitService } from '../../Services';

const AVATAR = require('../../Assets/github-logo.png');

export const Types = {
  REPOSITORY_REQUEST: 'Repository/Request',
  REPOSITORY_REQUEST_SUCCESS: 'Repository/Request/Success',
  REPOSITORY_REQUEST_FAILED: 'Repository/Request/Failed',
  REPOSITORY_COMMITS_REQUEST_SUCCESS: 'Repository/Commits/Request/Success',
  REPOSITORY_COMMITS_REQUEST_FAILED: 'Repository/Commits/Request/Failed',
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
  const id = repo.id;
  const credential = (user.user || {}).credential;

  return gitService.fetchDynamic({ url, credential })
    .then(payload => dispatch({
      type: Types.REPOSITORY_COMMITS_REQUEST_SUCCESS,
      payload: { id, commits: payload },
    }))
    .catch(error => dispatch({ type: Types.REPOSITORY_COMMITS_REQUEST_FAILED, payload: error.message }));
}

const INITIAL_STATE = {
  error: '',
  loading: false,
  repos: [],
  commits: [],
};

export const getCommitAvatar = commit => {
  const author = commit.author || {};
  return author.avatar_url ? { uri: author.avatar_url } : AVATAR
}

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
    case Types.REPOSITORY_COMMITS_REQUEST:
      return {
        ...state,
        error: INITIAL_STATE.error,
        loadingCommits: true,
      };
    case Types.REPOSITORY_COMMITS_REQUEST_SUCCESS:
      return {
        ...state,
        commits: {
          ...state.commits,
          [payload.id]: payload.commits,
        },
        error: INITIAL_STATE.error,
        loadingCommits: false,
      }
    case Types.REPOSITORY_COMMITS_REQUEST_FAILED:
      return {
        ...state,
        error: payload,
        loadingCommits: false,
      }
    default:
      return state;
  }
}
