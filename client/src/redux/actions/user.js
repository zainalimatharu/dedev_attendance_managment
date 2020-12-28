// importing required modules & packages
import axios from 'axios';

// importing action types
import { SET_USER, SET_USERS, AUTH_ERROR } from './types';

// import required actions from sibling action files
import { setAlert } from './alerts';

// importing utilities
import setAuthToken from '../../utilities/setAuthToken';

// get a single user => logged in user
const getUser = () => async (dispatch) => {
  try {
    if (localStorage.getItem('dd_token')) {
      setAuthToken(localStorage.getItem('dd_token'));
    }

    const res = await axios.get(`http://localhost:8088/users/getUser`);

    dispatch({ type: SET_USER, payload: res.data });
    console.log(res);
  } catch (error) {
    dispatch({ type: AUTH_ERROR });
    console.log(error.response);
  }
};

// get all employees of organization
const getUsers = () => async (dispatch) => {
  try {
    const res = await axios.get(`http://localhost:8088/users/getUsers`);

    console.log(res.data);

    dispatch({ type: SET_USERS, payload: res.data.users });
  } catch (error) {
    console.log(error);
    console.log(error.response);
  }
};

const updateUser = (data, userId, history) => async (dispatch) => {
  let formData = data;

  const body = JSON.stringify(formData);

  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await axios.post(
      `http://localhost:8088/users/updateUser/${userId}`,
      body,
      config
    );

    if (res.status === 200 && res.data.message === 'user updated') {
      dispatch({ type: SET_USER, payload: res.data.user });
    }

    dispatch(setAlert(`${res.data.user.name} updated`, 'success'));

    history.push('/dashboard');
  } catch (error) {
    console.log(error);
    console.log(error.response);
  }
};

// add new user
const addUser = (data) => async (dispatch) => {
  try {
    console.log(data);
  } catch (error) {
    console.log(error);
    console.log(error.response);
  }
};

export { getUser, getUsers, updateUser };
