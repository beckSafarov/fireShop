import * as constants from '../constants.js';
import axios from 'axios';

export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch({ type: constants.ORDER_CREATE_REQUEST });

    const cancelTokenSource = axios.CancelToken.source();

    const config = {
      headers: { 'Content-Type': 'application/json' },
      cancelToken: cancelTokenSource.token,
    };

    const data = await axios.post('/api/orders/addorder', order, config);

    dispatch({
      type: constants.ORDER_CREATE_SUCCESS,
      payload: data.data.createdOrder,
    });
  } catch (err) {
    if (axios.isCancel(err)) {
      console.log('axios request cancelled');
    } else {
      dispatch({
        type: constants.CART_REQUIRE_ALL_ITEMS_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  }
};

export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: constants.ORDER_DETAILS_REQUEST });

    const cancelTokenSource = axios.CancelToken.source();

    const data = await axios.get(`/api/orders/${id}`, {
      cancelToken: cancelTokenSource.token,
    });

    dispatch({
      type: constants.ORDER_DETAILS_SUCCESS,
      payload: data.data.order,
    });
  } catch (err) {
    if (axios.isCancel(err)) {
      console.log('axios request cancelled');
    } else {
      dispatch({
        type: constants.CART_REQUIRE_ALL_ITEMS_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  }
};

export const getMyOrders = () => async (dispatch) => {
  try {
    dispatch({ type: constants.MY_ORDERS_REQUEST });
    const cancelTokenSource = axios.CancelToken.source();

    const data = await axios.get(`/api/orders/myorders`, {
      cancelToken: cancelTokenSource.token,
    });

    dispatch({
      type: constants.MY_ORDERS_SUCCESS,
      payload: data.data.orders,
    });
  } catch (err) {
    if (axios.isCancel(err)) {
      console.log('axios request cancelled');
    } else {
      dispatch({
        type: constants.CART_REQUIRE_ALL_ITEMS_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  }
};
