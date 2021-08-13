import * as cs from '../constants.js'
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
  })

export const productListReducer = (state = { products: [] }, action) => {
  let newProducts, currProducts
  switch (action.type) {
    case cs.PRODUCT_LIST_REQUEST:
      return Loading(state)
    case cs.PRODUCT_LIST_SUCCESS:
      return Success(action.payload, 'request')
    case cs.PRODUCT_LIST_FAILURE:
      return Error(state, action.payload, 'request')
    case cs.PRODUCT_ADD_REQUEST:
      return Loading(state)
    case cs.PRODUCT_ADD_SUCCESS:
      newProducts = [...state.products]
      newProducts.push({ ...action.payload, new: true })
      return Success(newProducts, 'add')
    case cs.PRODUCT_ADD_FAILURE:
      return Error(state, action.payload, 'add')

    case cs.PRODUCT_UPDATE:
      let newProduct = action.payload
      currProducts = [...state.products]
      for (let i = 0; i < currProducts.length; i++) {
        if (currProducts[i]._id === newProduct._id) {
          newProduct.new && (newProduct.new = undefined)
          currProducts[i] = { ...currProducts[i], ...newProduct }
          break
        }
      }
      return Success(currProducts, 'update')
    case cs.PRODUCT_DELETE_REQUEST:
      return Loading(state)
    case cs.PRODUCT_DELETE_SUCCESS:
      newProducts = [...state.products]
      newProducts = state.products.filter((p) => p._id !== action.payload)
      return Success(newProducts, 'delete')
    case cs.PRODUCT_DELETE_FAILURE:
      return Error(state, action.payload, 'delete')
    case cs.PRODUCT_LIST_PROPERTY_RESET:
      let newState = { ...state }
      newState[action.payload] = null
      return newState
    default:
      return state
  }
}

export const productSearchReducer = (state = {}, action) => {
  switch (action.type) {
    case cs.PRODUCT_SEARCH_REQUEST:
      return Loading(state)
    case cs.PRODUCT_SEARCH_SUCCESS:
      return Success(action.payload)
    case cs.PRODUCT_SEARCH_FAILURE:
      return { loading: false, products: [], error: action.payload }
    case cs.PRODUCT_SEARCH_RESET:
      return {}
    case cs.PRODUCT_SEARCH_PROPERTY_RESET:
      let newState = state
      newState[action.payload] = null
      return newState
    default:
      return state
  }
}

export const productDetailsReducer = (state = { reviews: [] }, action) => {
  switch (action.type) {
    case cs.PRODUCT_DETAILS_REQUEST:
      return Loading(state)
    case cs.PRODUCT_DETAILS_SUCCESS:
      return Success2(action.payload, 'request')
    case cs.PRODUCT_DETAILS_FAILURE:
      return Error(state, action.payload, 'request')
    case cs.PRODUCT_DETAILS_UPDATE_REQUEST:
      return Loading(state)
    case cs.PRODUCT_DETAILS_UPDATE_SUCCESS:
      return Success2(action.payload, 'update')
    case cs.PRODUCT_DETAILS_UPDATE_FAILURE:
      return Error(state, action.payload, 'update')
    case cs.PRODUCT_REVIEW_UPDATE:
      const { user, body } = action.payload
      let reviews = [...state.product.reviews]
      reviews.forEach((r) => (r = r.user === user ? { ...r, body } : r))
      console.log(reviews)
      console.log({ ...state.products, reviews })
      return Success2({ ...state.product, reviews }, 'update')
    case cs.PRODUCT_DETAILS_RESET:
      let newState = { ...state }
      newState[action.payload] = null
      return newState
    default:
      return state
  }
}

export const productReviewReducer = (state = { reviews: [] }, action) => {
  switch (action.type) {
    case cs.PRODUCT_REVIEW_REQUEST:
      return { loading: true }
    case cs.PRODUCT_REVIEW_SUCCESS:
      return { loading: false, success: true }
    case cs.PRODUCT_REVIEW_FAILURE:
      return { loading: false, error: action.payload }
    case cs.PRODUCT_REVIEW_UPDATE_REQUEST:
      return { loading: true }
    case cs.PRODUCT_REVIEW_UPDATE_SUCCESS:
      return { loading: false, success: true }
    case cs.PRODUCT_REVIEW_UPDATE_FAILURE:
      return { loading: false, error: action.payload }
    case cs.PRODUCT_REVIEW_PROPERTY_RESET:
      let newState = { ...state }
      newState[action.payload] = null
      return newState
    default:
      return state
  }
}
