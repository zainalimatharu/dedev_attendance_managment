// importing required modules & packages
import axios from 'axios';

// importing URL
import { URL } from './keys';

// importing action types
import {
  SET_MYREPORT,
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
      payload: today.data,
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
    const result = await axios.post(
      `${URL}/reports/customizedReport`,
      body,
      config
    );

    console.log(result.data);

    dispatch({
      type: SET_CUSTOMIZED_REPORT,
      payload: result.data,
    });
  } catch (error) {
    console.log(error);
    console.log(error.response);
  }
};

// get report between specified time period of a given userId
const getMyReport = (data) => async (dispatch) => {
  dispatch({ type: SET_LOADING, payload: true });

  const { userId, gte, lte, message } = data;

  const body = JSON.stringify({ gte, lte, message });

  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const url = `${URL}/reports/myTimeSheet/${userId}`;

    const res = await axios.post(url, body, config);

    if (res.data.message === 'Record Not Found') {
      dispatch({
        type: SET_MYREPORT,
        payload: { myReport: null, presentToday: false },
      });

      dispatch(setAlert(res.data.message, 'info'));
    } else {
      dispatch({
        type: SET_MYREPORT,
        payload: { myReport: res.data, presentToday: true },
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
  getMyReport,
  clearReport,
  clearTodayReport,
  clearCustomizedReport,
  setReportLoading,
};
