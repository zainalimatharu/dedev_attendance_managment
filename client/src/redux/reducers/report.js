import {
  SET_MYTIMESHEET,
  SET_MYDAY,
  SET_LOADING,
  SET_TODAY_REPORT,
  SET_CUSTOMIZED_REPORT,
  SET_REPORT_LOADING,
  CLEAR_REPORT,
  CLEAR_TODAY_REPORT,
  CLEAR_CUSTOMIZED_REPORT,
  LOGOUT,
} from '../actions/types';

const initialState = {
  myTimeSheet: null,
  presentToday: null,
  todayReport: null,
  customizedReport: null,
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
      };
    case SET_TODAY_REPORT:
      return {
        ...state,
        todayReport: payload.today,
        loading: false,
      };
    case SET_CUSTOMIZED_REPORT:
      return {
        ...state,
        customizedReport: payload.thisMonth,
        loading: false,
      };
    case SET_MYTIMESHEET:
      return {
        ...state,
        myTimeSheet: payload.myTimeSheet,
        loading: false,
      };
    case LOGOUT:
    case CLEAR_REPORT:
      return {
        ...state,
        myTimeSheet: null,
        presentToday: null,
        todayReport: null,
        customizedReport: null,
        today: null,
        loading: true,
      };
    case CLEAR_TODAY_REPORT:
      return {
        ...state,
        todayReport: null,
        loading: true,
      };
    case CLEAR_CUSTOMIZED_REPORT:
      return {
        ...state,
        customizedReport: null,
        loading: true,
      };
    case SET_REPORT_LOADING:
      return {
        ...state,
        loading: payload,
      };
    default:
      return state;
  }
}
