import * as types from './actionTypes';

const initialState = {
  user: null,
  email: null,
  username: null,
  loading: false,
  error: null,
};

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.LOGIN_REQUESTED:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.LOGIN_SUCCEED:
      return {
        ...initialState,
        user: action.user,
      };
    case types.LOGIN_FAILED:
      return {
        ...initialState,
        error: action.error,
      };
    case types.SEARCH_LOGIN_REQUESTED:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case types.SEARCH_LOGIN_SUCCEED:
      return {
        ...state,
        loading: false,
        username: action.username,
      };
    case types.SET_EMAIL:
      return {
        ...initialState,
        email: action.email,
      };
    default:
      return state;
  }
}
