import * as constants from '../constants.js';
import axios from 'axios';

export const addToCart = (id, qty) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`/api/products/${id}`);
    dispatch({
      type: constants.CART_ADD_ITEM,
      payload: {
        _id: data.data._id,
        name: data.data.name,
        image: data.data.image,
        price: data.data.price,
        countInStock: data.data.countInStock,
        qty,
      },
    });

    localStorage.setItem(
      'cartItems',
      JSON.stringify(getState().cart.cartItems)
    );
  } catch (err) {
    console.log(err);
  }
};
