import { encode } from 'base-64';

import { gitService } from '../../Services';
import { isEmailValid } from '../../Utils/email';

export const Types = {
  LOGIN_ADD_EMAIL_REQUEST: 'Login/Add/Email/Request',
  LOGIN_ADD_EMAIL_SUCCESS: 'Login/Add/Email/Success',
  LOGIN_REMOVE_ERROR: 'Login/Remove/Error',
  LOGIN_REQUEST: 'Login/Request',
  LOGIN_SUCCESS: 'Login/Success',
  LOGIN_FAILED: 'Login/Failed',
  LOGIN_RESET: 'Login/Reset',
};

import { ROUTES } from '../../Routes/Routes';

export const userAddEmail = ({ dispatch }) => ({ email }) => {
  if (!email) return;

  if (isEmailValid(email)) {
    return dispatch({ type: Types.LOGIN_ADD_EMAIL_SUCCESS, payload: email });
  }

  // TODO: Global Toaster
  setTimeout(() => dispatch({ type: Types.LOGIN_REMOVE_ERROR }), 2000);
  return dispatch({ type: Types.LOGIN_FAILED, payload: 'Invalid Email' });
}

export const userLogin = ({ dispatch }) => ({ email, password, navigation }) => {
  if (!email || !password) return;

  const credential = encode(`${email}:${password}`);

  gitService.fetchUser({ email, password, credential })
    .then(payload => {
      dispatch({ type: Types.LOGIN_SUCCESS, payload: { ...payload, credential } });
      return navigation.navigate(ROUTES.MAIN);
    })
    .catch(error => {
      // TODO: Global Toaster
      setTimeout(() => dispatch({ type: Types.LOGIN_REMOVE_ERROR }), 5000);
      dispatch({ type: Types.LOGIN_FAILED, payload: error.message });
    });
}

const INITIAL_STATE = {
  email: '',
  error: '',
  loading: false,
  user: {},
};

export function reducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case Types.LOGIN_ADD_EMAIL_SUCCESS:
      return {
        ...state,
        email: payload,
        error: INITIAL_STATE.error,
      };
    case Types.LOGIN_REQUEST:
      return {
        ...state,
        error: INITIAL_STATE.error,
        loading: true,
      };
    case Types.LOGIN_SUCCESS:
      return {
        ...state,
        error: INITIAL_STATE.error,
        user: payload
      }
    case Types.LOGIN_FAILED:
      return {
        ...state,
        loading: false,
        error: payload
      };
    case Types.LOGIN_REMOVE_ERROR:
      return {
        ...state,
        error: INITIAL_STATE.error
      };
    case Types.LOGIN_RESET:
      return INITIAL_STATE;
    default:
      return state;
  }
}
