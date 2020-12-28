import { SET_MYTIMESHEET, SET_MYDAY, SET_LOADING } from '../actions/types';

const initialState = {
  myTimeSheet: null,
  presentToday: null,
  today: null,
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_LOADING:
      return { ...state, loading: payload };
    case SET_MYDAY:
      return {
        ...state,
        today: payload.today,
        presentToday: payload.presentToday,
        loading: false,
      };
    case SET_MYTIMESHEET:
      return {
        ...state,
        myTimeSheet: payload.myTimeSheet,
        loading: false,
      };
    default:
      return state;
  }
}
