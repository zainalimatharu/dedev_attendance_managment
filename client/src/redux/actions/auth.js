// importing required modules & packages
import axios from 'axios';

// importing action types
import {
  LOGIN_SUCCESS,
  CLEAR_USER,
  AUTH_ERROR,
  CLEAR_USER_REDUCER,
} from './types';

// importing utilities
import removeAuthToken from '../../utilities/removeAuthToken';

// import required actions from sibling action files
import { setAlert } from './alerts';
import { getUser } from './user';

const login = (data) => async (dispatch) => {
  dispatch({ type: CLEAR_USER_REDUCER });

  const { email, password } = data;

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post(
      'http://localhost:8088/auth/login',
      body,
      config
    );

    dispatch({ type: LOGIN_SUCCESS, payload: res.data });

    // console.log('logged in:', res.data);

    dispatch(getUser());
  } catch (error) {
    dispatch({ type: AUTH_ERROR });
    const err = error.response.data.message;

    if (err) {
      dispatch(setAlert(err, 'error'));
    }

    console.log(error);
    console.log(err, error.response.status);
  }
};

const logout = () => (dispatch) => {
  console.log('logging out: ', axios.defaults.headers.common['authorization']);

  removeAuthToken();
  dispatch({ type: CLEAR_USER });

  console.log('logged out: ', axios.defaults.headers.common['authorization']);
};

export { login, logout };
