import * as constants from '../constants.js';
import axios from 'axios';

export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: constants.PRODUCT_LIST_REQUEST });
    const { data } = await axios.get('/api/products');
    dispatch({ type: constants.PRODUCT_LIST_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: constants.PRODUCT_LIST_FAILURE,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
