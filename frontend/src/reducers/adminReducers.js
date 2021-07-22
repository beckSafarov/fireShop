import * as cs from '../constants';
const Loading = (state = {}, loading = true) => ({ ...state, loading });
const Error = (error, state = {}) => ({ loading: false, error, ...state });

export const userListReducer = (state = { users: [] }, action) => {
  let currList = state.users;
  let newState, newList;

  const Success = (users = action.payload) => ({
    loading: false,
    success: true,
    users,
  });
  switch (action.type) {
    case cs.USER_LIST_REQUEST:
      return Loading();
    case cs.USER_LIST_SUCCESS:
      return Success();
    case cs.USER_LIST_FAILURE:
      return Error(action.payload);
    case cs.USER_LIST_UPDATE:
      const updatedUser = action.payload;
      for (let i = 0; i < currList.length; i++) {
        if (currList[i]._id === updatedUser._id) {
          currList[i] = updatedUser;
          break;
        }
      }
      return Success(currList);
    case cs.USER_LIST_REMOVE:
      newList = currList.filter((user) => user._id !== action.payload);
      return Success(newList);
    case cs.USER_LIST_PROPERTY_RESET:
      newState = state;
      newState[action.payload] = null;
      return newState;
    default:
      return state;
  }
};

export const adminUserDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case cs.ADMIN_USER_DELETE_REQUEST:
      return Loading();
    case cs.ADMIN_USER_DELETE_SUCCESS:
      return { loading: false, success: true, message: action.payload };
    case cs.ADMIN_USER_DELETE_FAILURE:
      return Error(action.payload);
    case cs.ADMIN_USER_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

export const adminUserUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case cs.ADMIN_USER_UPDATE_REQUEST:
      return Loading(state);
    case cs.ADMIN_USER_UPDATE_SUCCESS:
      return { loading: false, success: true, user: action.payload };
    case cs.ADMIN_USER_UPDATE_FAILURE:
      return Error(action.payload, state);
    case cs.ADMIN_USER_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};

export const imgUploadReducer = (state = {}, action) => {
  switch (action.type) {
    case cs.IMG_UPLOAD_REQUEST:
      return Loading(state);
    case cs.IMG_UPLOAD_SUCCESS:
      return { loading: false, success: true, data: action.payload };
    case cs.IMG_UPLOAD_FAILURE:
      return Error(action.payload);
    case cs.IMG_UPLOAD_RESET:
      return {};
    default:
      return state;
  }
};
