import * as constants from '../constants';

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case constants.USER_LOGIN_REQUEST:
      return { loading: true };
    case constants.USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case constants.USER_LOGIN_FAILURE:
      return { loading: false, error: action.payload };
    case constants.USER_LOGOUT:
      return {};
    default:
      return state;
  }
};
