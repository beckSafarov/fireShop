import { STATES } from 'mongoose'
import * as cs from '../constants.js'

const Loading = (type, state = {}) => ({ ...state, loading: true, type })
const Success = (order, type) => ({
  loading: false,
  success: true,
  order,
  type,
})
const Error = (error, state = {}) => ({ ...state, loading: false, error })

export const orderCreateReducer = (state = { order: {} }, action) => {
  switch (action.type) {
    case cs.ORDER_CREATE_REQUEST:
      return { loading: true, order: {} }
    case cs.ORDER_CREATE_SUCCESS:
      return { loading: false, success: true, order: action.payload }
    case cs.ORDER_CREATE_FAIL:
      return { loading: false, order: {}, error: action.payload }
    default:
      return state
  }
}

export const ordersFilterReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case cs.ORDERS_FILTER_REQUEST:
      return { loading: true }
    case cs.ORDERS_FILTER_SUCCESS:
      return { loading: false, success: true, orders: action.payload }
    case cs.ORDERS_FILTER_FAILURE:
      return { loading: false, error: action.payload }
    case cs.ORDERS_FILTER_RESET:
      return {}
    default:
      return state
  }
}

export const orderDetailsReducer = (state = { order: {} }, action) => {
  switch (action.type) {
    case cs.ORDER_DETAILS_REQUEST:
      return Loading('request', state)
    case cs.ORDER_DETAILS_SUCCESS:
      return Success(action.payload, 'request')
    case cs.ORDER_DETAILS_FAIL:
      return Error(action.payload, state)
    case cs.ORDER_DETAILS_RESET:
      return {}
    case cs.ORDER_UPDATE_REQUEST:
      return Loading('update', state)
    case cs.ORDER_UPDATE_SUCCESS:
      return Success(action.payload, 'update')
    case cs.ORDER_UPDATE_FAIL:
      return Error(action.payload, state)
    case cs.ORDER_UPDATE_RESET:
      let newState = { ...state }
      newState[action.payload] = null
      return newState
    default:
      return state
  }
}

export const myOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case cs.MY_ORDERS_REQUEST:
      return { loading: true }
    case cs.MY_ORDERS_SUCCESS:
      return { loading: false, success: true, orders: action.payload }
    case cs.MY_ORDERS_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

// export const ordersFilterRedc

export const ordersListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case cs.ORDERS_LIST_REQUEST:
      return { loading: true }
    case cs.ORDERS_LIST_SUCCESS:
      return { loading: false, success: true, orders: action.payload }
    case cs.ORDERS_LIST_FAILURE:
      return { loading: false, error: action.payload }
    case cs.ORDERS_LIST_UPDATE_SUCCESS:
      const updatedOrder = action.payload
      let newOrders = [...state.orders]
      for (let i = 0; i < newOrders.length; i++) {
        if (newOrders[i]._id === updatedOrder._id) {
          newOrders[i].isDelivered = updatedOrder.isDelivered
          newOrders[i].deliveryStatus = updatedOrder.deliveryStatus
          break
        }
      }
      return {
        loading: false,
        success: true,
        type: 'update',
        orders: newOrders,
      }
    case cs.ORDERS_LIST_RESET:
      return {}
    case cs.ORDERS_LIST_PROPERTY_RESET:
      const newState = { ...state }
      newState[action.payload] = null
      return newState
    default:
      return state
  }
}
