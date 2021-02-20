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
        return {
          ...state,
          cartItems: state.cartItems.map((product) =>
            product._id === itemExists._id ? item : product
          ),
        };
      }
    default:
      return state;
  }
};
