import * as constants from '../constants';

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case constants.USER_LOGIN_REQUEST:
      return { loading: true };
    case constants.USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case constants.USER_LOGIN_FAILURE:
      return { loading: false, error: action.payload };
    case constants.USER_LOGOUT_REQUEST:
      return { loading: true };
    case constants.USER_LOGOUT_SUCCESS:
      return { loading: false, success: true };
    case constants.USER_LOGOUT_FAILURE:
      return { loading: false, error: action.payload };
    case constants.USER_INFO_UPDATE:
      return {
        loading: false,
        userInfo: { ...state.userInfo, ...action.payload },
      };
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case constants.USER_REGISTER_REQUEST:
      return { loading: true };
    case constants.USER_REGISTER_SUCCESS:
      return { loading: false, success: true };
    case constants.USER_REGISTER_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const updateUserDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case constants.USER_DETAILS_UPDATE_REQUEST:
      return { loading: true };
    case constants.USER_DETAILS_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case constants.USER_DETAILS_UPDATE_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const ShaddressReducer = (state = {}, action) => {
  switch (action.type) {
    case constants.SHADDRESS_POST_REQUEST:
      return { loading: true };
    case constants.SHADDRESS_POST_SUCCESS:
      return { loading: false, success: true, data: action.payload };
    case constants.SHADDRESS_POST_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
