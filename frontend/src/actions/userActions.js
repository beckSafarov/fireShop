import * as cs from '../constants.js';
import axios from 'axios';
import { getCart } from '../helpers/cartLCS';
const config = {
  headers: { 'Content-Type': 'application/json' },
  cancelToken: axios.CancelToken.source().token,
};

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: cs.USER_LOGIN_REQUEST });

    const { data } = await axios.post(
      '/api/users/login',
      { email, password },
      config
    );

    dispatch({ type: cs.USER_LOGIN_SUCCESS, payload: data.data });

    dispatch({
      type: cs.CART_ITEMS_RECEIVED,
      payload: data.data.cartItems,
    });
  } catch (err) {
    dispatch({
      type: cs.USER_LOGIN_FAILURE,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch({ type: cs.USER_LOGOUT_REQUEST });
    await axios.put('/api/users/logout');
    dispatch({ type: cs.USER_LOGOUT_SUCCESS });

    dispatch({ type: cs.USER_DETAILS_CLEAR });
    dispatch({ type: cs.CART_FLUSH });
  } catch (err) {
    dispatch({
      type: cs.USER_LOGOUT_FAILURE,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: cs.USER_REGISTER_REQUEST });

    const { data } = await axios.post(
      '/api/users',
      { name, email, password },
      config
    );

    dispatch({ type: cs.USER_REGISTER_SUCCESS });
    dispatch({ type: cs.USER_LOGIN_SUCCESS, payload: data.data });
  } catch (err) {
    dispatch({
      type: cs.USER_REGISTER_FAILURE,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const updateUserProfile = (user) => async (dispatch) => {
  try {
    dispatch({ type: cs.USER_DETAILS_UPDATE_REQUEST });
    await axios.put('/api/users/profile', user, config);
    dispatch({ type: cs.USER_DETAILS_UPDATE_SUCCESS });
  } catch (err) {
    dispatch({
      type: cs.USER_DETAILS_UPDATE_FAILURE,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const getMe = () => async (dispatch, getState) => {
  try {
    dispatch({ type: cs.USER_LOGIN_REQUEST });

    const { data } = await axios.get('../api/users/me', {
      cancelToken: axios.CancelToken.source().token,
    });

    dispatch({
      type: cs.USER_LOGIN_SUCCESS,
      payload: data.user || false,
    });

    dispatch({
      type: cs.CART_ITEMS_RECEIVED,
      payload: data.user ? data.user.cartItems : [],
    });
  } catch (err) {
    dispatch({
      type: cs.USER_LOGIN_FAILURE,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const createShaddress = (shaddress) => async (dispatch) => {
  try {
    dispatch({ type: cs.SHADDRESS_POST_REQUEST });

    const { data } = await axios.post(
      '../api/users/shippingaddress',
      shaddress,
      config
    );

    dispatch({
      type: cs.SHADDRESS_POST_SUCCESS,
      payload: data.shippingAddress,
    });
  } catch (err) {
    dispatch({
      type: cs.SHADDRESS_POST_FAILURE,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
