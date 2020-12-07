import axios from 'axios';

const login = (data) => async (dispatch) => {
  console.log(data);
  //   const config = {
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   };

  //   const body = JSON.stringify({ email, password });

  //   try {
  //     const res = await axios.post(
  //       'http://localhost:8088/auth/login',
  //       body,
  //       config
  //     );

  //     console.log(res);
  //   } catch (error) {
  //     console.log(error);
  //   }
};

export { login };
