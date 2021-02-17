import * as constants from '../constants.js';

export const productListReducer = (state = { products: [] }, action) => {
  console.log('State is below');
  console.log(state);

  console.log('Action is below');
  console.log(action);

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

/**
 * const fn = (state, action){
 *  action.type
 * }
 *
 * #what was expected:
 * dispatch(state, action)
 *
 * #what sent
 * dispatch({type: 'Something'}) || dispatch(action)
 * &&
 * dispatch({type: 'something', payload: 'something'})
 */
