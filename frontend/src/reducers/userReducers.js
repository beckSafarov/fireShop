import * as constants from '../constants';

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case constants.USER_LOGIN_REQUEST:
      return { loading: true };
    case constants.USER_LOGIN_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload };
    case constants.USER_LOGIN_FAILURE:
      return { loading: false, error: action.payload };
    case constants.USER_LOGOUT_REQUEST:
      return { loading: false };
    case constants.USER_LOGOUT_SUCCESS:
      return { loading: false, success: true };
    case constants.USER_LOGOUT_FAILURE:
      return { loading: false, error: action.payload };
    case constants.USER_INFO_UPDATE:
      return {
        loading: false,
        success: true,
        userInfo: { ...state.userInfo, ...action.payload },
      };
    case constants.USER_DETAILS_CLEAR:
      return {
        loading: false,
        success: true,
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

export const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case constants.USER_LIST_REQUEST:
      return { loading: true };
    case constants.USER_LIST_SUCCESS:
      return { loading: false, users: action.payload };
    case constants.USER_LIST_FAILURE:
      return { loading: false, error: action.payload };
    case constants.USER_LIST_REMOVE:
      // action.payload = erre23g (id of the user)
      let currList = state.users;
      const newList = currList.filter((user) => user._id !== action.payload);
      return { ...state, users: newList };
    default:
      return state;
  }
};

export const userDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case constants.USER_DELETE_REQUEST:
      return { loading: true };
    case constants.USER_DELETE_SUCCESS:
      return { loading: false, success: true, message: action.payload };
    case constants.USER_DELETE_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
