// importing required modules & packages
import axios from 'axios';
import moment from 'moment';

// importing URL
import { URL } from './keys';

// import required actions from sibling action files
import { getToday } from './report';

// set arrival time of user
const setArrival = (arrivalTime, userId) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ arrivalTime });

  try {
    const res = await axios.post(
      `${URL}/attendance/arrival/${userId}`,
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

// set departure time of user
const setDeparture = (departureTime, userId) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ departureTime });

  try {
    const res = await axios.post(
      `${URL}/attendance/departure/${userId}`,
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
