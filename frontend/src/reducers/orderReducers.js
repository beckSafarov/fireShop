import { STATES } from 'mongoose';
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

export const orderDetailsReducer = (
  state = { loading: true, order: [] },
  action
) => {
  switch (action.type) {
    case constants.ORDER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case constants.ORDER_DETAILS_SUCCESS:
      return { loading: false, success: true, order: action.payload };
    case constants.ORDER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
