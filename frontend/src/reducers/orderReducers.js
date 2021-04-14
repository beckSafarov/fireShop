import * as constants from '../constants.js';

export const orderCreateReducer = (state = { order: {} }, action) => {
  switch (action.type) {
    case constants.ORDER_CREATE_REQUEST:
      return { loading: true, order: {} };
    case constants.ORDER_CREATE_SUCCESS:
      return { loading: false, success: true, order: action.payload };
    case constants.ORDER_CREATE_FAIL:
      return { loading: false, order: {}, error: action.payload };
    default:
      return state;
  }
};
