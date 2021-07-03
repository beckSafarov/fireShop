import * as constants from '../constants.js';
import axios from 'axios';
import * as lcs from '../helpers/cartLCS.js';
const config = {
  headers: { 'Content-Type': 'application/json' },
  cancelToken: axios.CancelToken.source().token,
};
const confMin = { cancelToken: axios.CancelToken.source().token };

export const addToCart =
  (product, qty, logged = true, many = false) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: constants.CART_REQUIRE_ADD_ITEM });

      if (!many) product.qty = qty;

      if (logged) {
        const manyRoute = many ? '/many' : '';
        const res = await axios.post(
          `/api/users/cartItems${manyRoute}`,
          product,
          config
        );

        dispatch({
          type: constants.CART_ADD_ITEM,
          payload: {
            cartItems: res.data.cartItems,
            message: res.data.message,
          },
        });

        if (many) lcs.flushCart();

        const newCartItems = getState().cart.cartItems;
        dispatch({
          type: constants.USER_INFO_UPDATE,
          payload: {
            cartItems: newCartItems,
          },
        });
      } else {
        const { cart: newCart, message } = lcs.add(product);
        dispatch({
          type: constants.CART_ADD_ITEM,
          payload: {
            cartItems: newCart,
            message: message,
          },
        });
      }
    } catch (err) {
      if (axios.isCancel(err)) {
        console.log('axios request cancelled');
      } else {
        dispatch({
          type: constants.CART_ADD_ITEM_FAIL,
          payload:
            err.response && err.response.data.message
              ? err.response.data.message
              : err.message,
        });
      }
    }
  };

export const buyNowAction =
  (product, qty, logged) => async (dispatch, getState) => {
    try {
      dispatch({ type: constants.CART_REQUIRE_BUY_NOW });

      product.qty = qty;

      if (logged) {
        const res = await axios.post(`/api/users/cartItems`, product, config);

        dispatch({
          type: constants.CART_BUY_NOW_SUCCESS,
          payload: {
            cartItems: res.data.cartItems,
            message: res.data.message,
          },
        });
        const newCartItems = getState().cart.cartItems;
        dispatch({
          type: constants.USER_INFO_UPDATE,
          payload: {
            cartItems: newCartItems,
          },
        });
      } else {
        const { cart: newCart, message } = lcs.add(product);
        dispatch({
          type: constants.CART_BUY_NOW_SUCCESS,
          payload: {
            cartItems: newCart,
            message: message,
          },
        });
      }
    } catch (err) {
      dispatch({
        type: constants.CART_BUY_NOW_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };

export const qtsReset = (body) => async (dispatch) => {
  try {
    dispatch({ type: constants.CARD_ITEM_QUANTITY_RESET_REQUIRE });

    const res = await axios.put('api/users/cartItems/many', body, config);

    dispatch({
      type: constants.CARD_ITEM_QUANTITY_RESET_SUCCESS,
      payload: res.data.cartItems,
    });

    dispatch({
      type: constants.USER_INFO_UPDATE,
      payload: {
        cartItems: res.data.cartItems,
      },
    });
  } catch (err) {
    if (axios.isCancel(err)) {
      console.log('axios request cancelled');
    } else {
      dispatch({
        type: constants.CARD_ITEM_QUANTITY_RESET_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  }
};

export const qtyReset =
  (product, logged = true) =>
  async (dispatch) => {
    try {
      dispatch({ type: constants.CARD_ITEM_QUANTITY_RESET_REQUIRE });

      logged
        ? await axios.put('api/users/cartItems/qty', product, config)
        : lcs.qtyUpdate(product);

      dispatch({
        type: constants.CARD_ITEM_QUANTITY_RESET_SUCCESS,
        payload: product,
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

// export const removeItem =
//   (id, logged = true) =>
//   async (dispatch, getState) => {
//     try {
//       dispatch({ type: constants.CART_REMOVE_ITEM_REQUEST });

//       if (logged) {
//         const res = await axios.delete(`/api/users/cartItems/${id}`, {
//           cancelToken: axios.CancelToken.source().token,
//         });

//         dispatch({
//           type: constants.CART_REQUIRE_ALL_ITEMS_SUCCESS,
//           payload: res.data.cartItems,
//         });

//         const newCartItems = getState().cart.cartItems;
//         dispatch({
//           type: constants.USER_INFO_UPDATE,
//           payload: {
//             cartItems: newCartItems,
//           },
//         });
//       } else {
//         const cartAfterRemoval = lcs.remove({ _id: id });
//         dispatch({
//           type: constants.CARD_ITEM_QUANTITY_RESET_SUCCESS,
//           payload: cartAfterRemoval,
//         });
//       }
//     } catch (err) {
//       if (axios.isCancel(err)) {
//         console.log('axios request cancelled');
//       } else {
//         dispatch({
//           type: constants.CART_REQUIRE_ALL_ITEMS_FAIL,
//           payload:
//             err.response && err.response.data.message
//               ? err.response.data.message
//               : err.message,
//         });
//       }
//     }
//   };

export const removeItem =
  (id, logged = true) =>
  async (dispatch) => {
    try {
      dispatch({ type: constants.CART_REMOVE_ITEM_REQUEST });

      logged
        ? await axios.delete(`/api/users/cartItems/${id}`, confMin)
        : lcs.remove({ _id: id });

      dispatch({
        type: constants.CART_REMOVE_ITEM_SUCCESS,
        payload: id,
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

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
    type: constants.CART_SAVE_PAYMENT_METHOD,
    payload: data,
  });

  localStorage.setItem('paymentMethod', JSON.stringify(data));
};

export const flushCart = () => async (dispatch) => {
  try {
    dispatch({
      type: constants.CART_FLUSH,
    });
  } catch (err) {}
};
