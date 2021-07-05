import * as constants from '../constants.js';
import axios from 'axios';
const minConfig = {
  cancelToken: axios.CancelToken.source().token,
};
const config = {
  headers: { 'Content-Type': 'application/json' },
  ...minConfig,
};

export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch({ type: constants.ORDER_CREATE_REQUEST });

    const data = await axios.post('/api/orders/addorder', order, config);

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

export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: constants.ORDER_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/orders/${id}`, minConfig);

    dispatch({
      type: constants.ORDER_DETAILS_SUCCESS,
      payload: data.order,
    });
  } catch (err) {
    dispatch({
      type: constants.ORDER_DETAILS_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const getMyOrders = () => async (dispatch) => {
  try {
    dispatch({ type: constants.MY_ORDERS_REQUEST });

    const { data } = await axios.get(`/api/orders/myorders`, minConfig);

    const orders = data.orders.length > 0 ? data.orders : null;

    dispatch({
      type: constants.MY_ORDERS_SUCCESS,
      payload: orders,
    });
  } catch (err) {
    dispatch({
      type: constants.MY_ORDERS_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};
