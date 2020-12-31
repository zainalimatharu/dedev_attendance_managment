// importing required modules & packages
import axios from 'axios';

// importing URL
import { URL } from './keys';

// importing action types
import { SET_MYTIMESHEET, SET_MYDAY, SET_LOADING } from './types';

// import required actions from sibling action files
import { setAlert } from './alerts';

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

export { getToday, getMyTimeSheet };
