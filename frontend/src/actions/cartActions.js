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

export const qtyReset = (id, qty) => (dispatch, getState) => {
  dispatch({
    type: constants.CARD_ITEM_QUANTITY_RESET,
    payload: {
      _id: id,
      qty,
    },
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};

export const removeItem = (id) => (dispatch, getState) => {
  dispatch({
    type: constants.CART_REMOVE_ITEM,
    payload: {
      _id: id,
    },
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
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

//export const addToCart = (id, qty) => async (dispatch, getState) => {
//   try {
//     const { data } = await axios.get(`/api/products/${id}`);
//     dispatch({
//       type: constants.CART_ADD_ITEM,
//       payload: {
//         _id: data.data._id,
//         name: data.data.name,
//         image: data.data.image,
//         countInStock: data.data.countInStock,
//         qty,
//       },
//     });

//     localStorage.setItem(
//       'cartItems',
//       JSON.stringify(getState().cart.cartItems)
//     );
//   } catch (err) {
//     console.log(err);
//   }
// };
