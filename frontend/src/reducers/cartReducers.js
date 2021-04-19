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
    case constants.CART_REQUIRE_ALL_ITEMS:
      return {
        ...state,
        loading: true,
      };
    case constants.CART_REQUIRE_ALL_ITEMS_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        cartItems: action.payload,
      };
    case constants.CART_REQUIRE_ALL_ITEMS_FAIL:
      return {
        ...state,
        success: false,
        loading: false,
        error: action.payload,
      };
    case constants.CARD_ITEM_QUANTITY_RESET_REQUIRE:
      return {
        ...state,
        loading: true,
      };
    case constants.CART_REQUIRE_ALL_ITEMS_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        cartItems: action.payload,
      };
    case constants.CART_REQUIRE_ALL_ITEMS_FAIL:
      return {
        ...state,
        success: false,
        loading: false,
        error: action.payload,
      };
    case constants.CART_REMOVE_ITEM_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case constants.CART_REMOVE_ITEM_SUCCESS:
      return {
        ...state,
        success: true,
        loading: false,
        cartItems: action.payload,
      };
    case constants.CART_REMOVE_ITEM_FAILURE:
      return {
        ...state,
        success: false,
        loading: false,
        error: action.payload,
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
