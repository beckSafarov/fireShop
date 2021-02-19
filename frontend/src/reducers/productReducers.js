import * as constants from '../constants.js';

export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case constants.PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };
    case constants.PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload };
    case constants.PRODUCT_LIST_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productDetailsReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case constants.PRODUCT_DETAILS_REQUEST:
      return { ...state, loading: true };
    case constants.PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };
    case constants.PRODUCT_DETAILS_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
