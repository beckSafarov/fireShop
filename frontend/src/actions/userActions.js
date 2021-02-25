import * as constants from '../constants.js';
import axios from 'axios';

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: constants.USER_LOGIN_REQUEST });

    const config = { headers: { 'Content-Type': 'application/json' } };

    const { data } = await axios.post(
      '/api/users/login',
      { email, password },
      config
    );

    dispatch({ type: constants.USER_LOGIN_SUCCESS, payload: data.data });

    localStorage.setItem('userInfo', JSON.stringify(data.data));
  } catch (err) {
    dispatch({
      type: constants.USER_LOGIN_FAILURE,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo');
  dispatch({ type: constants.USER_LOGOUT });
};
