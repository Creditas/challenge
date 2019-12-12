import * as types from './actionTypes';

export const searchInputChanged = term => ({
  type: types.SEARCH_INPUT_CHANGED,
  term,
});

export const listRequested = () => ({
  type: types.LIST_REQUESTED,
});

export const listFetched = list => ({
  type: types.LIST_FETCHED,
  list,
});

export const listFailed = error => ({
  type: types.LIST_FAILED,
  error,
});

export const setFilteredList = list => ({
  type: types.SET_FILTERED_LIST,
  list,
});
