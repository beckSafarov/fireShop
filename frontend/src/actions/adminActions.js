import * as cs from '../constants.js';
import axios from 'axios';
const config = {
  headers: { 'Content-Type': 'application/json' },
  cancelToken: axios.CancelToken.source().token,
};

export const listUsers = () => async (dispatch) => {
  try {
    dispatch({ type: cs.USER_LIST_REQUEST });

    const { data } = await axios.get('/api/admin/users');

    dispatch({ type: cs.USER_LIST_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: cs.USER_LIST_FAILURE,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const adminUpdateUser = (id, body) => async (dispatch) => {
  try {
    dispatch({ type: cs.ADMIN_USER_UPDATE_REQUEST });
    const { data } = await axios.put(`/api/admin/users/${id}`, body, config);
    dispatch({ type: cs.ADMIN_USER_UPDATE_SUCCESS, payload: data.user });
    dispatch({ type: cs.USER_LIST_UPDATE, payload: data.user });
  } catch (err) {
    dispatch({
      type: cs.ADMIN_USER_UPDATE_FAILURE,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: cs.ADMIN_USER_DELETE_REQUEST });
    const { data } = await axios.delete(`/api/admin/users/${id}`);
    dispatch({
      type: cs.USER_LIST_REMOVE,
      payload: id,
    });
    dispatch({
      type: cs.ADMIN_USER_DELETE_SUCCESS,
      payload: data.message,
    });
  } catch (err) {
    dispatch({
      type: cs.ADMIN_USER_DELETE_FAILURE,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const addProduct = (body) => async (dispatch) => {
  try {
    dispatch({ type: cs.PRODUCT_ADD_REQUEST });
    await axios.post(`/api/products`, body, config);
    dispatch({ type: cs.PRODUCT_ADD_SUCCESS, payload: body });
  } catch (err) {
    dispatch({
      type: cs.PRODUCT_ADD_FAILURE,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const updateProduct = (id, body) => async (dispatch) => {
  try {
    dispatch({ type: cs.PRODUCT_UPDATE_REQUEST });
    await axios.put(`/api/products/${id}`, body, config);
    dispatch({ type: cs.PRODUCT_UPDATE_SUCCESS, payload: { _id: id, body } });
  } catch (err) {
    dispatch({
      type: cs.PRODUCT_UPDATE_FAILURE,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: cs.PRODUCT_DELETE_REQUEST });
    await axios.delete(`/api/products/${id}`);
    dispatch({
      type: cs.PRODUCT_DELETE_SUCCESS,
      payload: id,
    });
  } catch (err) {
    dispatch({
      type: cs.PRODUCT_DELETE_FAILURE,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
