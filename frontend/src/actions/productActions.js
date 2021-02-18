import * as constants from '../constants.js';
import axios from 'axios';

export const listProducts = () => async (dispatch) => {
  // console.log('Dispatch in listProducts()');
  // console.log(dispatch);
  try {
    //setting a status of API request, which announces loading process
    dispatch({ type: constants.PRODUCT_LIST_REQUEST });
    const { data } = await axios.get('/api/products');

    //setting a status of successful API response, as well as assigning payload
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

const something = () => {
  return async (dispatch) => {};
};

const something_2 = () => {
  return async function (dispatch) {};
};
