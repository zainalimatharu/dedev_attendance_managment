import { LOGIN_SUCCESS, SET_USER, CLEAR_USER_REDUCER } from '../actions/types';

const initialState = {
  user: null,
  systemRole: null,
  token: localStorage.getItem('dd_token'),
  isAuthenticated: false,
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
        systemRole: payload.admin ? 'admin' : 'employee',
      };
    case SET_USER:
      return { ...state, user: payload, isAuthenticated: true };
    case CLEAR_USER_REDUCER:
      localStorage.removeItem('dd_token');
      return {
        user: null,
        systemRole: null,
        token: localStorage.getItem('dd_token'),
        isAuthenticated: false,
      };
    default:
      return state;
  }
}
