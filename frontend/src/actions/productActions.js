import * as cs from '../constants.js'
import axios from 'axios'
import { axiosConfig, config } from '../helpers/axiosConfigs'

export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: cs.PRODUCT_LIST_REQUEST })

    const { data } = await axios.get('/api/products', axiosConfig)

    dispatch({ type: cs.PRODUCT_LIST_SUCCESS, payload: data })
  } catch (err) {
    dispatch({
      type: cs.PRODUCT_LIST_FAILURE,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    })
  }
}

export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: cs.PRODUCT_DETAILS_REQUEST })

    const { data } = await axios.get(`/api/products/${id}`, axiosConfig)

    dispatch({ type: cs.PRODUCT_DETAILS_SUCCESS, payload: data.data })
  } catch (err) {
    dispatch({
      type: cs.PRODUCT_DETAILS_FAILURE,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    })
  }
}

export const productReviewAction = (id, body) => async (dispatch) => {
  try {
    dispatch({ type: cs.PRODUCT_REVIEW_REQUEST })

    await axios.post(`/api/products/${id}/reviews`, body, config)

    dispatch({ type: cs.PRODUCT_REVIEW_SUCCESS })
  } catch (err) {
    dispatch({
      type: cs.PRODUCT_REVIEW_FAILURE,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    })
  }
}

export const productReviewUpdateAction =
  (id, body, user) => async (dispatch) => {
    try {
      dispatch({ type: cs.PRODUCT_REVIEW_UPDATE_REQUEST })

      await axios.put(`/api/products/${id}/reviews`, body, config)

      dispatch({ type: cs.PRODUCT_REVIEW_UPDATE_SUCCESS })
      dispatch({
        type: cs.PRODUCT_REVIEW_UPDATE,
        payload: { user, body },
      })
    } catch (err) {
      dispatch({
        type: cs.PRODUCT_REVIEW_UPDATE_FAILURE,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      })
    }
  }
