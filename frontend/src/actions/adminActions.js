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

export const addProduct = () => async (dispatch) => {
  try {
    dispatch({ type: cs.PRODUCT_ADD_REQUEST });
    const { data } = await axios.post(`/api/products`);
    dispatch({ type: cs.PRODUCT_ADD_SUCCESS, payload: data });
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

export const updateProduct = (body) => async (dispatch) => {
  try {
    dispatch({ type: cs.PRODUCT_DETAILS_UPDATE_REQUEST });
    await axios.put(`/api/products/${body._id}`, body, config);

    dispatch({
      type: cs.PRODUCT_DETAILS_UPDATE_SUCCESS,
      payload: body,
    });

    dispatch({
      type: cs.PRODUCT_UPDATE,
      payload: body,
    });
  } catch (err) {
    dispatch({
      type: cs.PRODUCT_DETAILS_UPDATE_FAILURE,
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

export const imgUpload = (formData) => async (dispatch) => {
  try {
    dispatch({ type: cs.IMG_UPLOAD_REQUEST });

    const { data } = await axios.post(`/api/upload/`, formData, {
      headers: { 'Content-type': 'multipart/form-data' },
    });

    dispatch({
      type: cs.IMG_UPLOAD_SUCCESS,
      payload: data,
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: cs.IMG_UPLOAD_FAILURE,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
