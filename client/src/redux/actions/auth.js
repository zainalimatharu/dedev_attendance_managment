import { LOGIN_SUCCESS, SET_USER, CLEAR_USER_REDUCER } from './types';
import axios from 'axios';

// importing utilities
import setAuthToken from '../../utilities/setAuthToken';

const getUser = () => async (dispatch) => {
  try {
    if (localStorage.getItem('dd_token')) {
      setAuthToken(localStorage.getItem('dd_token'));
    }

    const res = await axios.get(`http://localhost:8088/user/get_user`);

    dispatch({ type: SET_USER, payload: res.data });
  } catch (error) {
    console.log(error);
    console.log(error.status);
  }
};

const login = (data) => async (dispatch) => {
  dispatch({type: CLEAR_USER_REDUCER})

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
    console.log(error);
    console.log(error.response);
  }
};

export { login, getUser };
