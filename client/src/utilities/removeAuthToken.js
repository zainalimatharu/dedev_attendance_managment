import axios from 'axios';

const removeAuthToken = () => {
  delete axios.defaults.headers.common['authorization'];
};

export default removeAuthToken;
