import * as constants from '../constants.js';
import axios from 'axios';

export const addToCart = (product, qty) => async (dispatch, getState) => {
  try {
    dispatch({ type: constants.CART_REQUIRE_ADD_ITEM });
    const config = {
      headers: { 'Content-Type': 'application/json' },
    };
    product.qty = qty;

    const data = await axios.post(`/api/users/cartitems`, product, config);
    // data.data.cartItems

    dispatch({
      type: constants.CART_ADD_ITEM,
      payload: {
        cartItems: data.data.cartItems,
        message: data.data.message,
      },
    });

    localStorage.setItem(
      'cartItems',
      JSON.stringify(getState().cart.cartItems)
    );
  } catch (err) {
    dispatch({
      type: constants.CART_ADD_ITEM_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const getAllCartItems = () => async (dispatch) => {
  try {
    dispatch({ type: constants.CART_REQUIRE_ALL_ITEMS });

    const data = await axios.get(`/api/users/cartitems`);

    dispatch({
      type: constants.CART_REQUIRE_ALL_ITEMS_SUCCESS,
      payload: data.data.cartItems,
    });
  } catch (err) {
    dispatch({
      type: constants.CART_REQUIRE_ALL_ITEMS_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const qtyReset = (id, qty) => async (dispatch, getState) => {
  try {
    dispatch({ type: constants.CARD_ITEM_QUANTITY_RESET_REQUIRE });

    const config = {
      headers: { 'Content-Type': 'application/json' },
    };

    const body = { _id: id, qty };

    const serverResponse = await axios.put(`api/users/cartItems`, body, config);

    dispatch({
      type: constants.CART_REQUIRE_ALL_ITEMS_SUCCESS,
      payload: serverResponse.data.cartItems,
    });
  } catch (err) {
    dispatch({
      type: constants.CARD_ITEM_QUANTITY_RESET_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const removeItem = (id) => async (dispatch) => {
  try {
    dispatch({ type: constants.CART_REMOVE_ITEM_REQUEST });

    const serverResponse = await axios.delete(`/api/users/cartItems/${id}`);

    dispatch({
      type: constants.CART_REQUIRE_ALL_ITEMS_SUCCESS,
      payload: serverResponse.data.cartItems,
    });
  } catch (err) {
    dispatch({
      type: constants.CART_REMOVE_ITEM_FAILURE,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({ type: constants.CART_SAVE_SHIPPING_ADDRESS, payload: data });
  localStorage.setItem('shippingAddress', JSON.stringify(data));
};

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: constants.CART_SAVE_PAYMENT_METHOD,
    payload: data,
  });

  localStorage.setItem('paymentMethod', JSON.stringify(data));
};
