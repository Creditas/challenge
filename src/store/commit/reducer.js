import * as types from './actionTypes';

const initialState = {
  list: [],
  loading: false,
  error: null,
};

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.LIST_REQUESTED:
      return {
        ...initialState,
        loading: true,
      };
    case types.LIST_FETCHED:
      return {
        ...initialState,
        list: action.list,
      };
    case types.LIST_FAILED:
      return {
        ...initialState,
        error: action.error,
      };
    default:
      return state;
  }
}
