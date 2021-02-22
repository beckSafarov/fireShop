import * as constants from '../constants.js';
import axios from 'axios';

export const addToCart = (product, qty) => async (dispatch, getState) => {
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

// export const addToCart = (id, qty) => async (dispatch, getState) => {
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
