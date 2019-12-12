import * as types from './actionTypes';

const initialState = {
  list: [],
  filteredList: [],
  loading: false,
  error: null,
  term: '',
};

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.SEARCH_INPUT_CHANGED:
      return {
        ...state,
        term: action.term,
      };
    case types.LIST_REQUESTED:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.LIST_FETCHED:
      return {
        ...initialState,
        list: action.list,
        filteredList: action.list,
      };
    case types.SET_FILTERED_LIST:
      return {
        ...state,
        loading: false,
        filteredList: action.list,
      };
    case types.LIST_FAILED:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
}
