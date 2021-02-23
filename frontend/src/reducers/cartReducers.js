import * as constants from '../constants';

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case constants.CART_ADD_ITEM:
      const item = action.payload;

      const itemExists = state.cartItems.find(
        (product) => product._id === item._id
      );

      if (!itemExists) {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      } else {
        const cartAfterIncrement = state.cartItems.map((product) => {
          if (product._id === item._id) {
            return { ...product, qty: product.qty + item.qty };
          }
          return product;
        });

        return {
          ...state,
          cartItems: cartAfterIncrement,
        };
      }
    case constants.CARD_ITEM_QUANTITY_RESET:
      //{type: ..., payload: {id, qty}}
      const cartAfterReset = state.cartItems.map((product) => {
        if (product._id === action.payload._id) {
          return { ...product, qty: action.payload.qty };
        }
        return product;
      });

      return {
        ...state,
        cartItems: cartAfterReset,
      };
    case constants.CART_REMOVE_ITEM:
      //{type: ..., payload: {id}}
      const cartAfterRemoval = state.cartItems.map(
        (product) => product._id !== action.payload._id
      );

      return {
        ...state,
        cartItems: cartAfterRemoval,
      };
    default:
      return state;
  }
};
