import * as cs from '../constants'
const Loading = (loading = true) => ({ loading })
const Error = (error) => ({ loading: false, error })
const Success = (userInfo = null) => ({
  loading: false,
  success: true,
  userInfo,
})

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case cs.USER_LOGIN_REQUEST:
      return Loading()
    case cs.USER_LOGIN_SUCCESS:
      return Success(action.payload)
    case cs.USER_LOGIN_FAILURE:
      return Error(action.payload)
    case cs.USER_LOGOUT_REQUEST:
      return Loading(false)
    case cs.USER_LOGOUT_SUCCESS:
      return Success()
    case cs.USER_LOGOUT_FAILURE:
      return Error(action.payload)
    case cs.USER_INFO_UPDATE:
      return Success({ ...state.userInfo, ...action.payload })
    case cs.USER_DETAILS_CLEAR:
      return {}
    default:
      return state
  }
}

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case cs.USER_REGISTER_REQUEST:
      return Loading()
    case cs.USER_REGISTER_SUCCESS:
      return Success(undefined)
    case cs.USER_REGISTER_FAILURE:
      return Error(action.payload)
    default:
      return state
  }
}

export const updateUserDetailsReducer = (state = {}, action) => {
  let newState = state
  switch (action.type) {
    case cs.USER_DETAILS_UPDATE_REQUEST:
      return Loading()
    case cs.USER_DETAILS_UPDATE_SUCCESS:
      return Success(undefined)
    case cs.USER_DETAILS_UPDATE_FAILURE:
      return Error(action.payload)
    case cs.USER_DETAILS_PROPERTY_RESET:
      newState[action.payload] = null
      return newState
    default:
      return state
  }
}

export const ShaddressReducer = (state = {}, action) => {
  let newState = state
  switch (action.type) {
    case cs.SHADDRESS_POST_REQUEST:
      return Loading()
    case cs.SHADDRESS_POST_SUCCESS:
      return { loading: false, success: true, data: action.payload }
    case cs.SHADDRESS_POST_FAILURE:
      return Error(action.payload)
    case cs.SHADDRESS_PROPERTY_RESET:
      newState[action.payload] = null
      return newState
    default:
      return state
  }
}
