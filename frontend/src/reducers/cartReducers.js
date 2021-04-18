import * as constants from '../constants';

export const cartReducer = (
  state = { loading: false, message: null, cartItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case constants.CART_REQUIRE_ADD_ITEM:
      return { ...state, loading: false };
    case constants.CART_ADD_ITEM:
      return {
        ...state,
        success: true,
        cartItems: action.payload.cartItems,
        message: action.payload.message,
      };
    case constants.CART_ADD_ITEM_FAIL:
      return {
        ...state,
        success: false,
        loading: false,
        error: action.payload,
      };
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

      let cartAfterRemoval = state.cartItems.filter(
        (product) => product._id !== action.payload._id
      );

      return {
        ...state,
        cartItems: cartAfterRemoval,
      };
    case constants.CART_SAVE_SHIPPING_ADDRESS:
      //type: ..., payload: shippingAddress
      return {
        ...state,
        shippingAddress: action.payload,
      };
    case constants.CART_SAVE_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };
    default:
      return state;
  }
};
//product._id !== action.payload._id ? product : continue;
