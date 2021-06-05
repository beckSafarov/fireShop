import * as constants from '../constants.js';
import axios from 'axios';

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: constants.USER_LOGIN_REQUEST });

    const cancelTokenSource = axios.CancelToken.source();

    const config = {
      headers: { 'Content-Type': 'application/json' },
      cancelToken: cancelTokenSource.token,
    };

    const { data } = await axios.post(
      '/api/users/login',
      { email, password },
      config
    );

    dispatch({ type: constants.USER_LOGIN_SUCCESS, payload: data.data });
  } catch (err) {
    if (axios.isCancel(err)) {
      console.log('axios request cancelled');
    } else {
      dispatch({
        type: constants.USER_LOGIN_FAILURE,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch({ type: constants.USER_LOGOUT_REQUEST });
    await axios.put('/api/users/logout');
    dispatch({ type: constants.USER_LOGOUT_SUCCESS });
    localStorage.removeItem('userInfo');
    dispatch({ type: constants.USER_DETAILS_CLEAR });
  } catch (err) {
    if (axios.isCancel(err)) {
      console.log('axios request cancelled');
    } else {
      dispatch({
        type: constants.USER_LOGOUT_FAILURE,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  }
};

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: constants.USER_REGISTER_REQUEST });

    const cancelTokenSource = axios.CancelToken.source();

    const config = {
      headers: { 'Content-Type': 'application/json' },
      cancelToken: cancelTokenSource.token,
    };

    const { data } = await axios.post(
      '/api/users',
      { name, email, password },
      config
    );

    dispatch({ type: constants.USER_REGISTER_SUCCESS });
    dispatch({ type: constants.USER_LOGIN_SUCCESS, payload: data.data });
    localStorage.setItem('userInfo', JSON.stringify(data.data));
  } catch (err) {
    if (axios.isCancel(err)) {
      console.log('axios request cancelled');
    } else {
      dispatch({
        type: constants.USER_REGISTER_FAILURE,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  }
};

export const updateUserProfile = (user) => async (dispatch) => {
  try {
    dispatch({ type: constants.USER_DETAILS_UPDATE_REQUEST });

    const cancelTokenSource = axios.CancelToken.source();

    const config = {
      headers: { 'Content-Type': 'application/json' },
      cancelToken: cancelTokenSource.token,
    };

    await axios.put('/api/users/profile', user, config);

    dispatch({ type: constants.USER_DETAILS_UPDATE_SUCCESS });
  } catch (err) {
    if (axios.isCancel(err)) {
      console.log('axios request cancelled');
    } else {
      dispatch({
        type: constants.USER_DETAILS_UPDATE_FAILURE,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  }
};

export const getMe = () => async (dispatch, getState) => {
  try {
    dispatch({ type: constants.USER_LOGIN_REQUEST });

    const cancelTokenSource = axios.CancelToken.source();

    const { data } = await axios.get('../api/users/me', {
      cancelToken: cancelTokenSource.token,
    });

    dispatch({ type: constants.USER_LOGIN_SUCCESS, payload: data.user });
  } catch (err) {
    if (axios.isCancel(err)) {
      console.log('axios request cancelled');
    } else {
      dispatch({
        type: constants.USER_LOGIN_FAILURE,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  }
};

export const createShaddress = (shaddress) => async (dispatch) => {
  try {
    dispatch({ type: constants.SHADDRESS_POST_REQUEST });

    const cancelTokenSource = axios.CancelToken.source();

    const config = {
      headers: { 'Content-Type': 'application/json' },
      cancelToken: cancelTokenSource.token,
    };

    const { data } = await axios.post(
      '../api/users/shippingaddress',
      shaddress,
      config
    );

    dispatch({
      type: constants.SHADDRESS_POST_SUCCESS,
      payload: data.shippingAddress,
    });
  } catch (err) {
    if (axios.isCancel(err)) {
      console.log('axios request cancelled');
    } else {
      dispatch({
        type: constants.SHADDRESS_POST_FAILURE,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  }
};
