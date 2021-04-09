import * as constants from '../constants.js';
import axios from 'axios';

export const addToCart = (product, qty) => (dispatch, getState) => {
  dispatch({
    type: constants.CART_ADD_ITEM,
    payload: {
      _id: product._id,
      name: product.name,
      image: product.image,
      countInStock: product.countInStock,
      qty,
    },
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
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
