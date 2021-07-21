import * as cs from '../constants.js';
import axios from 'axios';

export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: cs.PRODUCT_LIST_REQUEST });

    const { data } = await axios.get('/api/products', {
      cancelToken: axios.CancelToken.source().token,
    });

    dispatch({ type: cs.PRODUCT_LIST_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: cs.PRODUCT_LIST_FAILURE,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: cs.PRODUCT_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/products/${id}`, {
      cancelToken: axios.CancelToken.source().token,
    });

    dispatch({ type: cs.PRODUCT_DETAILS_SUCCESS, payload: data.data });
  } catch (err) {
    dispatch({
      type: cs.PRODUCT_DETAILS_FAILURE,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
