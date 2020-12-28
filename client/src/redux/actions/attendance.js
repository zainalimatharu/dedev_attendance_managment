import axios from 'axios';
import moment from 'moment';
import { getToday } from './report';

const setArrival = (arrivalTime, userId) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ arrivalTime });

  try {
    const res = await axios.post(
      `http://localhost:8088/attendance/arrival/${userId}`,
      body,
      config
    );

    dispatch(
      getToday({
        userId,
        gte: moment().startOf('day').utc(true)._d,
        lte: moment().endOf('day').utc(true)._d,
        message: 'Record Not Found',
      })
    );
  } catch (error) {
    console.log(error.response);
  }
};

const setDeparture = (departureTime, userId) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ departureTime });

  try {
    const res = await axios.post(
      `http://localhost:8088/attendance/departure/${userId}`,
      body,
      config
    );

    dispatch(
      getToday({
        userId,
        gte: moment().startOf('day').utc(true)._d,
        lte: moment().endOf('day').utc(true)._d,
        message: 'Record Not Found',
      })
    );
  } catch (error) {
    console.log(error);
  }
};

export { setArrival, setDeparture };
