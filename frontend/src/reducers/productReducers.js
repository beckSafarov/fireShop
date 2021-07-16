import * as cs from '../constants.js';
const Loading = (state) => ({ ...state, loading: true });
const Error = (state, error) => ({ ...state, loading: false, error });
const Success = (products, type) => ({ loading: false, products, type });

export const productListReducer = (state = { products: [] }, action) => {
  let newProducts = state.products;
  switch (action.type) {
    case cs.PRODUCT_LIST_REQUEST:
      return Loading(state);
    case cs.PRODUCT_LIST_SUCCESS:
      return Success(action.payload, 'request');
    case cs.PRODUCT_LIST_FAILURE:
      return Error(state, action.payload);

    case cs.PRODUCT_ADD_REQUEST:
      return Loading(state);
    case cs.PRODUCT_ADD_SUCCESS:
      newProducts.push(action.payload);
      return Success(newProducts, 'add');
    case cs.PRODUCT_ADD_FAILURE:
      return Error(state, action.payload);

    case cs.PRODUCT_UPDATE_REQUEST:
      return Loading(state);
    case cs.PRODUCT_UPDATE_SUCCESS:
      const { _id, body } = action.payload;
      newProducts.forEach((p) => {
        p = p._id === _id ? { ...p, ...body } : p;
      });
      return Success(newProducts, 'update');
    case cs.PRODUCT_UPDATE_FAILURE:
      return Error(state, action.payload);

    case cs.PRODUCT_DELETE_REQUEST:
      return Loading(state);
    case cs.PRODUCT_DELETE_SUCCESS:
      newProducts = state.products.filter((p) => p._id !== action.payload);
      return Success(newProducts, 'delete');
    case cs.PRODUCT_DELETE_FAILURE:
      return Error(state, action.payload);

    case cs.PRODUCT_LIST_PROPERTY_RESET:
      let newState = { ...state };
      newState[action.payload] = null;
      return newState;
    default:
      return state;
  }
};

export const productDetailsReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  switch (action.type) {
    case cs.PRODUCT_DETAILS_REQUEST:
      return Loading(state);
    case cs.PRODUCT_DETAILS_SUCCESS:
      return Success(action.payload);
    case cs.PRODUCT_DETAILS_FAILURE:
      return Error(state, action.payload);
    default:
      return state;
  }
};
