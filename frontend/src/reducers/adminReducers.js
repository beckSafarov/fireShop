import * as cs from '../constants';
const Loading = (loading = true) => ({ loading });
const Error = (error) => ({ loading: false, error });

export const userListReducer = (state = { users: [] }, action) => {
  let currList = state.users;

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
      // action.payload: {_id: 24322, ...};
      const updatedUser = action.payload;
      for (let i = 0; i < currList.length; i++) {
        if (currList[i]._id === updatedUser._id) {
          currList[i] = updatedUser;
          break;
        }
      }
      return Success(currList);
    case cs.USER_LIST_REMOVE:
      // action.payload = erre23g (id of the user)
      const newList = currList.filter((user) => user._id !== action.payload);
      return Success(newList);
    default:
      return state;
  }
};

export const userDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case cs.USER_DELETE_REQUEST:
      return Loading();
    case cs.USER_DELETE_SUCCESS:
      return { loading: false, success: true, message: action.payload };
    case cs.USER_DELETE_FAILURE:
      return Error(action.payload);
    default:
      return state;
  }
};

export const adminUserUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case cs.ADMIN_USER_UPDATE_REQUEST:
      return Loading();
    case cs.ADMIN_USER_UPDATE_SUCCESS:
      return { loading: false, success: true, user: action.payload };
    case cs.ADMIN_USER_UPDATE_FAILURE:
      return Error(action.payload);
    case cs.ADMIN_USER_UPDATE_RESET:
      let newState = state;
      newState[action.payload] = null;
      return newState;
    default:
      return state;
  }
};
