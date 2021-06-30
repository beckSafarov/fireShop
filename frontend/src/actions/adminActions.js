import * as constants from '../constants.js';
import axios from 'axios';

export const listUsers = () => async (dispatch) => {
  try {
    dispatch({ type: constants.USER_LIST_REQUEST });

    const { data } = await axios.get('/api/admin/users');

    dispatch({ type: constants.USER_LIST_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: constants.USER_LIST_FAILURE,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const adminUpdateUser = (id, body) => async (dispatch) => {
  try {
    dispatch({ type: constants.ADMIN_USER_UPDATE_REQUEST });

    const config = {
      headers: { 'Content-Type': 'application/json' },
      cancelToken: axios.CancelToken.source().token,
    };

    const { data } = await axios.put(`/api/admin/users/${id}`, body, config);

    dispatch({ type: constants.ADMIN_USER_UPDATE_SUCCESS, payload: data.user });
    dispatch({ type: constants.USER_LIST_UPDATE, payload: data.user });
  } catch (err) {
    dispatch({
      type: constants.ADMIN_USER_UPDATE_FAILURE,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: constants.USER_DELETE_REQUEST });

    const { data } = await axios.delete(`/api/admin/users/${id}`);

    dispatch({ type: constants.USER_LIST_REMOVE, payload: id });
    dispatch({ type: constants.USER_DELETE_SUCCESS, payload: data.message });
  } catch (err) {
    dispatch({
      type: constants.USER_DELETE_FAILURE,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
