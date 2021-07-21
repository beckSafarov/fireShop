import * as cs from '../constants.js';
const Loading = (state) => ({ ...state, loading: true }),
  Error = (state, error, type) => ({ ...state, loading: false, error, type }),
  Success = (products, type) => ({
    loading: false,
    success: true,
    products,
    type,
  }),
  Success2 = (product, type) => ({
    loading: false,
    product,
    success: true,
    type,
  });

export const productListReducer = (state = { products: [] }, action) => {
  let newProducts, body;
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
      newProducts = [...state.products];
      newProducts.push(action.payload);
      return Success(newProducts, 'add');
    case cs.PRODUCT_ADD_FAILURE:
      return Error(state, action.payload);

    case cs.PRODUCT_UPDATE:
      let newProduct = action.payload;
      let currProducts = [...state.products];
      for (let i = 0; i < currProducts.length; i++) {
        if (currProducts[i]._id === newProduct._id) {
          currProducts[i] = newProduct;
          break;
        }
      }
      return Success(currProducts, 'update');

    case cs.PRODUCT_DELETE_REQUEST:
      return Loading(state);
    case cs.PRODUCT_DELETE_SUCCESS:
      newProducts = [...state.products];
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

export const productDetailsReducer = (state = { reviews: [] }, action) => {
  switch (action.type) {
    case cs.PRODUCT_DETAILS_REQUEST:
      return Loading(state);
    case cs.PRODUCT_DETAILS_SUCCESS:
      return Success2(action.payload, 'request');
    case cs.PRODUCT_DETAILS_FAILURE:
      return Error(state, action.payload, 'request');
    case cs.PRODUCT_DETAILS_UPDATE_REQUEST:
      return Loading(state);
    case cs.PRODUCT_DETAILS_UPDATE_SUCCESS:
      return Success2(action.payload, 'update');
    case cs.PRODUCT_DETAILS_UPDATE_FAILURE:
      return Error(state, action.payload, 'update');
    case cs.PRODUCT_DETAILS_RESET:
      let newState = { ...state };
      newState[action.payload] = null;
      return newState;
    default:
      return state;
  }
};
