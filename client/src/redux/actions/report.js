// importing required modules & packages
import axios from 'axios';
import moment from 'moment';

// importing URL
import { URL } from './keys';

// importing action types
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
} from './types';

// import required actions from sibling action files
import { setAlert } from './alerts';

const getTodayReport = (data) => async (dispatch) => {
  // dispatch({ type: SET_LOADING, payload: true });

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const today = await axios.get(`${URL}/reports/todayReport`);

    console.log(today.data);

    dispatch({
      type: SET_TODAY_REPORT,
      payload: { today: today.data },
    });
  } catch (error) {
    console.log(error);
    console.log(error.response);
  }
};

const getCustomizedReport = (data) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  console.log(`gte: ${data.gte}`);
  console.log(`lte: ${data.lte}`);

  const body = JSON.stringify(data);

  try {
    const thisMonth = await axios.post(
      `${URL}/reports/customizedReport`,
      body,
      config
    );

    console.log(thisMonth.data);

    dispatch({
      type: SET_CUSTOMIZED_REPORT,
      payload: { thisMonth: thisMonth.data },
    });
  } catch (error) {
    console.log(error);
    console.log(error.response);
  }
};

// get today's report e.g arrival & departure time etc
const getToday = (data) => async (dispatch) => {
  const { userId, gte, lte, message } = data;

  console.log('gte:', gte, 'lte:', lte);

  const body = JSON.stringify({ gte, lte, message });

  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const url = `${URL}/reports/myTimeSheet/${userId}`;

    const res = await axios.post(url, body, config);
    console.log('my time sheet:', res.data, res.status);
    if (res.data.message === 'Record Not Found') {
      dispatch({
        type: SET_MYDAY,
        payload: { today: null, presentToday: false },
      });
    } else {
      dispatch({
        type: SET_MYDAY,
        payload: { today: res.data, presentToday: true },
      });
    }
  } catch (error) {
    console.log(error);
    console.log(error.response);
  }
};

// get time sheed between specified time period
const getMyTimeSheet = (data) => async (dispatch) => {
  dispatch({ type: SET_LOADING, payload: true });

  const { userId, gte, lte, message } = data;

  console.log('gte:', gte, 'lte:', lte);

  const body = JSON.stringify({ gte, lte, message });

  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const url = `${URL}/reports/myTimeSheet/${userId}`;

    const res = await axios.post(url, body, config);
    console.log('my time sheet:', res.data, res.status);
    if (res.data.message === 'No Record Found') {
      dispatch({
        type: SET_MYTIMESHEET,
        payload: { myTimeSheet: null },
      });

      dispatch(setAlert(res.data.message, 'info'));
    } else {
      dispatch({
        type: SET_MYTIMESHEET,
        payload: { myTimeSheet: res.data },
      });
    }
  } catch (error) {
    console.log(error);
    console.log(error.response);
  }
};

const clearReport = () => (dispatch) => {
  dispatch({ type: CLEAR_REPORT });
};

const clearTodayReport = () => (dispatch) => {
  dispatch({ type: CLEAR_TODAY_REPORT });
};

const clearCustomizedReport = () => (dispatch) => {
  dispatch({ type: CLEAR_CUSTOMIZED_REPORT });
};

const setReportLoading = (payload) => (dispatch) => {
  dispatch({ type: SET_REPORT_LOADING, payload });
};

export {
  getTodayReport,
  getCustomizedReport,
  getToday,
  getMyTimeSheet,
  clearReport,
  clearTodayReport,
  clearCustomizedReport,
  setReportLoading,
};
