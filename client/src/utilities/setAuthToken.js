import axios from 'axios';

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    // axios.defaults.headers.common['x-auth-token'] = null;
    // if (axios.defaults.headers.common['x-auth-token']) {
      delete axios.defaults.headers.common['x-auth-token'];
    // }
  }
};

export default setAuthToken;
