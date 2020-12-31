import {
  LOGIN_SUCCESS,
  SET_USER,
  CLEAR_USER,
  CLEAR_USER_REDUCER,
  AUTH_ERROR,
} from '../actions/types';

const initialState = {
  user: null,
  systemRole: null,
  token: localStorage.getItem('dd_token'),
  isAuthenticated: false,
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_SUCCESS:
      localStorage.setItem('dd_token', payload.token);
      return {
        ...state,
        token: payload.token,
        isAuthenticated: true,
      };
    case SET_USER:
      return {
        ...state,
        user: payload,
        isAuthenticated: true,
        systemRole: payload.admin ? 'admin' : 'employee',
        loading: false,
      };
    case CLEAR_USER:
    case AUTH_ERROR:
      localStorage.removeItem('dd_token');
      return {
        user: null,
        token: null,
        systemRole: null,
        isAuthenticated: false,
        loading: payload.loading,
      };
    default:
      return state;
  }
}
