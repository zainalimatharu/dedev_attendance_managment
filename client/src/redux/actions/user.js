// importing required modules & packages
import axios from 'axios';

// importing action types
import {
  SET_USER,
  SET_USERS,
  AUTH_ERROR,
  SET_USERBYID,
  SETUSER_LOADING,
} from './types';

// importing URL
import { URL } from './keys';

// import required actions from sibling action files
import { setAlert } from './alerts';

// importing utilities
import setAuthToken from '../../utilities/setAuthToken';

// get a single user => logged in user
const getUser = () => async (dispatch) => {
  try {
    if (localStorage.getItem('dd_token')) {
      setAuthToken(localStorage.getItem('dd_token'));

      const res = await axios.get(`${URL}/users/getUser`);

      dispatch({ type: SET_USER, payload: res.data });
    } else {
      dispatch({ type: AUTH_ERROR, payload: { loading: false } });
    }
  } catch (error) {
    dispatch({ type: AUTH_ERROR, payload: { loading: false } });
    console.log(error.response);
  }
};

// get a single user => By id
const getUserById = (userId) => async (dispatch) => {
  dispatch({ type: SETUSER_LOADING, payload: true });
  try {
    const res = await axios.get(`${URL}/users/getUser/${userId}`);

    dispatch({ type: SET_USERBYID, payload: res.data });
  } catch (error) {
    console.log(error);
    console.log(error.response);
  }
};

// get all employees of organization
const getUsers = () => async (dispatch) => {
  try {
    const res = await axios.get(`${URL}/users/getUsers`);

    dispatch({ type: SET_USERS, payload: res.data.users });
  } catch (error) {
    console.log(error);
    console.log(error.response);
  }
};

const setUsers = (payload) => (dispatch) => {
  dispatch({ type: SET_USERS, payload });
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
      `${URL}/users/updateUser/${userId}`,
      body,
      config
    );

    // if (res.status === 200 && res.data.message === 'user updated') {
    //   dispatch({ type: SET_USER, payload: res.data.user });
    // }

    dispatch(setAlert(`${res.data.user.name} updated`, 'success'));

    history.push('/dashboard');
  } catch (error) {
    dispatch(setAlert(`Error occurred`, 'danger'));

    console.log(error);
    console.log(error.response);
  }
};

// add new user
const addUser = (data, history) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify(data);

  try {
    let res = await axios.post(`${URL}/users/addEmployee`, body, config);

    dispatch(setAlert(`New employee created`, 'success'));

    history.push('/employees');
  } catch (error) {
    console.log(error.response);
    dispatch(setAlert(error.response.data.message, 'warning'));
  }
};

const setLoading = (payload) => (dispatch) => {
  dispatch({ type: SETUSER_LOADING, payload });
};

export {
  getUser,
  getUserById,
  getUsers,
  setUsers,
  updateUser,
  addUser,
  setLoading,
};
