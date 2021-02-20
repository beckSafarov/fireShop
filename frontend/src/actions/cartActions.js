import * as constants from '../constants.js';
import axios from 'axios';

export const addToCart = (product, qty) => (dispatch, getState) => {
  dispatch({
    type: constants.CART_ADD_ITEM,
    payload: {
      _id: product._id,
      name: product.name,
      image: product.image,
      price: product.price,
      countInStock: product.countInStock,
      qty,
    },
  });

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems));
};
