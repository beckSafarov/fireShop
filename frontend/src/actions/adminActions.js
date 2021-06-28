import * as constants from '../constants.js';
import axios from 'axios';

export const listUsers = () => async (dispatch) => {
  try {
    dispatch({ type: constants.USER_LIST_REQUEST });

    const { data } = await axios.get('/api/users');

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

export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: constants.USER_DELETE_REQUEST });

    const { data } = await axios.delete(`/api/users/${id}`);
    console.log(data);
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
