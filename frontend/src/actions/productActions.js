import * as constants from '../constants.js';
import axios from 'axios';

export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: constants.PRODUCT_LIST_REQUEST });
    const cancelTokenSource = axios.CancelToken.source();

    const { data } = await axios.get('/api/products', {
      cancelToken: cancelTokenSource.token,
    });

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

export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: constants.PRODUCT_DETAILS_REQUEST });

    const cancelTokenSource = axios.CancelToken.source();

    const { data } = await axios.get(`/api/products/${id}`, {
      cancelToken: cancelTokenSource.token,
    });

    dispatch({ type: constants.PRODUCT_DETAILS_SUCCESS, payload: data.data });
  } catch (err) {
    dispatch({
      type: constants.PRODUCT_DETAILS_FAILURE,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const getProductPrices = (ids) => async (dispatch) => {
  try {
    dispatch({ type: constants.PRODUCT_PRICE_REQUEST });

    const cancelTokenSource = axios.CancelToken.source();

    const config = {
      headers: { 'Content-Type': 'application/json' },
      cancelToken: cancelTokenSource.token,
    };

    const response = await axios.post('/api/products/prices', ids, config);

    dispatch({
      type: constants.PRODUCT_PRICE_SUCCESS,
      payload: response.data.prices,
    });
  } catch (err) {
    dispatch({
      type: constants.PRODUCT_PRICE_FAILURE,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
