import * as constants from '../constants.js';
import axios from 'axios';

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: constants.ORDER_CREATE_REQUEST });

    const config = {
      headers: { 'Content-Type': 'application/json' },
    };

    const data = await axios.post('/api/orders/addorder', order, config);

    console.log(data.data);

    dispatch({
      type: constants.ORDER_CREATE_SUCCESS,
      payload: data.data.createdOrder,
    });
  } catch (err) {
    dispatch({
      type: constants.ORDER_CREATE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
