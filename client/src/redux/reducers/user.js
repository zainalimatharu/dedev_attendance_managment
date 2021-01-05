import {
  SET_USERS,
  SET_USERBYID,
  SETUSER_LOADING,
  LOGOUT,
} from '../actions/types';

const initialState = {
  users: [],
  user: {},
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_USERS:
      return {
        ...state,
        users: payload,
        loading: false,
      };
    case SET_USERBYID:
      return {
        ...state,
        user: payload,
        loading: false,
      };
    case SETUSER_LOADING:
      return {
        ...state,
        loading: payload,
      };
    case LOGOUT:
      return {
        ...state,
        users: [],
        user: {},
        loading: true,
      };
    default:
      return state;
  }
}
