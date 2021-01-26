import { SET_NAV_LOADING, SET_OPEN_PAGE } from '../actions/types';

const initialState = {
  openPage: '',
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_NAV_LOADING:
      return { ...state, loading: payload };
    case SET_OPEN_PAGE:
      return { ...state, openPage: payload, loading: false };
    default:
      return state;
  }
}
