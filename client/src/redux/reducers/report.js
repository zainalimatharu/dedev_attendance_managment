import {
  SET_MYTIMESHEET,
  SET_MYDAY,
  SET_LOADING,
  SET_TODAY_REPORT,
  SET_MYREPORT,
  SET_CUSTOMIZED_REPORT,
  SET_REPORT_LOADING,
  CLEAR_REPORT,
  CLEAR_TODAY_REPORT,
  CLEAR_CUSTOMIZED_REPORT,
  LOGOUT,
} from '../actions/types';

const initialState = {
  me: {
    presentToday: null,
    myReport: null,
  },
  todayReport: null,
  customizedReport: null,
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case SET_LOADING:
      return { ...state, loading: payload };
    case SET_TODAY_REPORT:
      return {
        ...state,
        todayReport: payload,
        loading: false,
      };
    case SET_CUSTOMIZED_REPORT:
      return {
        ...state,
        customizedReport: payload,
        loading: false,
      };
    case SET_MYREPORT:
      return {
        ...state,
        me: {
          ...state.me,
          presentToday: payload.presentToday,
          myReport: payload.myReport,
        },
        loading: false,
      };
    case LOGOUT:
    case CLEAR_REPORT:
      return {
        me: {
          presentToday: null,
          myReport: null,
        },
        todayReport: null,
        customizedReport: null,
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
