import * as constants from '../constants';

export const cartReducer = (
  state = { loading: false, message: null, cartItems: [], shippingAddress: {} },
  action
) => {
  const Error = () => {
    return {
      ...state,
      success: false,
      loading: false,
      error: action.payload,
    };
  };

  const Loading = () => {
    return { ...state, loading: true };
  };

  const Success = (cartItems, successType, message, shaddress) => {
    return {
      loading: false,
      success: true,
      successType: successType || 'undefined',
      message: message || null,
      cartItems: cartItems || state.cartItems,
      shippingAddress: shaddress || state.shippingAddress,
    };
  };

  switch (action.type) {
    case constants.CART_REQUIRE_ADD_ITEM:
      return Loading();

    case constants.CART_ADD_ITEM:
      const { cartItems, message } = action.payload;
      return Success(cartItems, 'add', message);

    case constants.CART_ADD_ITEM_FAIL:
      return Error();

    case constants.CART_REQUIRE_BUY_NOW:
      return Loading();

    case constants.CART_BUY_NOW_SUCCESS:
      return Success(action.payload.cartItems, 'buyNow', null);

    case constants.CART_BUY_NOW_FAIL:
      return Error();

    case constants.CART_REQUIRE_ALL_ITEMS:
      return Loading();

    case constants.CART_REQUIRE_ALL_ITEMS_SUCCESS:
      return Success(action.payload, 'require');

    case constants.CART_REQUIRE_ALL_ITEMS_FAIL:
      return Error();

    case constants.CARD_ITEM_QUANTITY_RESET_REQUIRE:
      return Loading();

    case constants.CARD_ITEM_QUANTITY_RESET_SUCCESS:
      return Success(action.payload, 'reset');

    case constants.CARD_ITEM_QUANTITY_RESET_FAIL:
      return Error();

    case constants.CART_REMOVE_ITEM_REQUEST:
      return Loading();

    case constants.CART_REMOVE_ITEM_SUCCESS:
      return Success(action.payload, 'remove');

    case constants.CART_REMOVE_ITEM_FAILURE:
      return Error();

    case constants.CART_PROPERTY_RESET:
      //action.payload = 'ewfwefw'
      let newState = state;
      newState[action.payload] = null;
      return newState;
    case constants.CART_SAVE_SHIPPING_ADDRESS:
      return { ...state, shippingAddress: action.payload };

    case constants.CART_SAVE_PAYMENT_METHOD:
      return { ...state, paymentMethod: action.payload };

    case constants.CART_FLUSH_REQUIRE:
      return Loading();

    case constants.CART_FLUSH:
      return Success([], '', null, {});

    case constants.CART_FLUSH_FAIL:
      return Error();

    default:
      return state;
  }
};
//product._id !== action.payload._id ? product : continue;
