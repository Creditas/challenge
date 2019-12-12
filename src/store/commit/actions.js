import * as types from './actionTypes';

export const listRequested = id => ({
  type: types.LIST_REQUESTED,
  id,
});

export const listFetched = list => ({
  type: types.LIST_FETCHED,
  list,
});

export const listFailed = error => ({
  type: types.LIST_FAILED,
  error,
});
